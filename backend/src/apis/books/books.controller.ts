import { Request, Response } from 'express';

import booksService from '@apis/books/books.service';

import { FindBooks } from './books.interface';

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
const createBook = async (req: Request, res: Response) => {
  const { title } = req.body;

  const userId = res.locals.user.id;

  const book = await booksService.createBook({ title, userId });

  res.status(201).send(book);
};
const editBook = async (req: Request, res: Response) => {
  // const userId = res.locals.user.id;

  console.log(req.body);

  const book = await booksService.editBook(req.body);

  // 스크랩 update로직 추가 필요

  res.status(200).send(book);
};

export default {
  getBook,
  getBooks,
  createBook,
  editBook,
};
