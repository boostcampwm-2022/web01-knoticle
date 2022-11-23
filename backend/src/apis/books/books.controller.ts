import { Request, Response } from 'express';

import bookService from '@apis/books/books.service';

const bookTest = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  const bookData = await bookService.getBookData(bookId);

  // 쿠키에서 유저아이디 검출 미들웨어 추가 -> req.userId -> 북마크 확인

  res.status(200).send(bookData);
};

export default {
  bookTest,
};
