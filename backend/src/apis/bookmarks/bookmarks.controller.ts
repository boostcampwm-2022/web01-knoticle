import { Request, Response } from 'express';

import bookmarksService from '@apis/bookmarks/bookmarks.service';

const createBookmark = async (req: Request, res: Response) => {
  const { book_id } = req.body;
  const userId = res.locals.user.id;

  const bookmarkId = await bookmarksService.createBookmark(Number(userId), Number(book_id));

  return res.status(200).send({ bookmarkId });
};

const deleteBookmark = async (req: Request, res: Response) => {
  const bookmarkId = Number(req.params.bookmarkId);

  const bookamrk = await bookmarksService.deleteBookmark(bookmarkId);

  return res.status(200).send(bookamrk);
};

export default {
  createBookmark,
  deleteBookmark,
};
