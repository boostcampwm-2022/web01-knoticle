import { Request, Response } from 'express';

import { FindBooks, SearchBooks } from '@apis/books/books.interface';
import booksService from '@apis/books/books.service';

const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const book = await booksService.findBook(+bookId, userId);

  res.status(200).send(book);
};

const getBooks = async (req: Request, res: Response) => {
  const { order, take, editor } = req.query as unknown as FindBooks;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const books = await booksService.findBooks({ order, take: +take, userId, editor });

  res.status(200).send(books);
};

const searchBooks = async (req: Request, res: Response) => {
  const { query, page, take, userId } = req.query as unknown as SearchBooks;

  const searchResult = await booksService.searchBooks({ query, userId, take: +take, page });

  res.status(200).send(searchResult);
};

const createBook = async (req: Request, res: Response) => {
  const { title } = req.body;

  const userId = res.locals.user.id;

  const book = await booksService.createBook({ title, userId });

  res.status(201).send(book);
};

export default {
  getBook,
  getBooks,
  searchBooks,
  createBook,
};
