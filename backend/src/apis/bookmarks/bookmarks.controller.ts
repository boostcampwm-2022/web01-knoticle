import { Request, Response } from 'express';

import bookmarksService from '@apis/bookmarks/bookmarks.service';

const createBookmark = async (req: Request, res: Response) => {
  const { book_id } = req.body;
  const userId = res.locals.user.id;

  const bookmarkId = await bookmarksService.createBookmark(Number(userId), Number(book_id));
  res.status(200).send({ bookmarkId });
};

export default {
  createBookmark,
};
