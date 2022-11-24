import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

import { FindBooks } from './books.interface';

const getBookData = async (bookId: number) => {
  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          nickname: true,
          profile_image: true,
        },
      },
      scraps: {
        select: {
          order: true,
          article: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
  });

  if (!book) throw new NotFound(Message.BOOK_NOTFOUND);

  return book;
};

const findBooks = async ({ order, take }: FindBooks) => {
  const sortOptions = [];

  if (order === 'bookmark') sortOptions.push({ bookmarks: { _count: 'desc' as const } });
  if (order === 'newest') sortOptions.push({ created_at: 'desc' as const });

  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      thumbnail_image: true,
      created_at: true,
      user: {
        select: {
          nickname: true,
        },
      },
      scraps: {
        select: {
          order: true,
          article: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      deleted_at: null,
    },
    orderBy: sortOptions,
    take,
  });

  return books;
};

export default {
  getBookData,
  findBooks,
};
