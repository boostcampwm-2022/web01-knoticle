import { Request, Response } from 'express';

import { FindBooks, SearchBooks } from '@apis/books/books.interface';
import booksService from '@apis/books/books.service';
import { IScrap } from '@apis/scraps/scraps.interface';
import scrapsService from '@apis/scraps/scraps.service';
import { Forbidden, Message } from '@errors';

const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const book = await booksService.getBook(+bookId, userId);

  return res.status(200).send(book);
};

const getBooks = async (req: Request, res: Response) => {
  const { order, take, editor, type } = req.query as unknown as FindBooks;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const books = await booksService.getBooks({ order, take: +take, userId, editor, type });

  return res.status(200).send(books);
};

const searchBooks = async (req: Request, res: Response) => {
  const { query, page, take, userId } = req.query as unknown as SearchBooks;

  const searchResult = await booksService.searchBooks({ query, userId, take: +take, page });

  return res.status(200).send(searchResult);
};

const createBook = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title.length) throw new Forbidden(Message.BOOK_INVALID_TITLE);

  const userId = res.locals.user.id;

  const book = await booksService.createBook({ title, userId });

  const bookData = await booksService.getBook(book.id, userId);

  return res.status(201).send(bookData);
};

const updateBook = async (req: Request, res: Response) => {
  const { id, title, thumbnail_image, scraps } = req.body;

  if (!title.length) throw new Forbidden(Message.BOOK_INVALID_TITLE);

  const userId = res.locals.user.id;

  const book = await booksService.updateBook({ id, title, thumbnail_image });

  scraps.forEach(async (scrap: IScrap) => {
    await scrapsService.updateScrapOrder(scrap);
  });

  const bookData = await booksService.getBook(book.id, userId);

  return res.status(200).send(bookData);
};

const deleteBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);

  const userId = res.locals.user.id;

  const book = await booksService.deleteBook(bookId, userId);

  return res.status(200).send(book);
};

export default {
  getBook,
  getBooks,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
};
