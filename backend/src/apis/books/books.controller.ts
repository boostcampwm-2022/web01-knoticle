import { Request, Response } from 'express';

import booksService from '@apis/books/books.service';

const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await booksService.findBook(+bookId, res.locals.user?.id);

  res.status(200).send(book);
};

const getBooks = async (req: Request, res: Response) => {
  console.log(req.query);

  const { order, take } = req.query as unknown as {
    order: 'newest' | 'bookmark';
    take: number;
  };

  const books = await booksService.findBooks({ order, take: +take, userId: res.locals.user?.id });

  res.status(200).send(books);
};

export default {
  getBook,
  getBooks,
};
