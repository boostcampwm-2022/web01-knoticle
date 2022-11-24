import { prisma } from '@config/orm.config';

import { FindBooks } from './books.interface';

const findBook = async (bookId: number, userId: number) => {
  let additionalJoin = {};

  if (userId)
    additionalJoin = {
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
    };

  const book = await prisma.book.findFirst({
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
        orderBy: { order: 'asc' },
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
      ...additionalJoin,
    },
    where: {
      id: bookId,
      deleted_at: null,
    },
  });

  return book;
};

const findBooks = async ({ order, take, userId }: FindBooks) => {
  const sortOptions = [];

  if (order === 'bookmark') sortOptions.push({ bookmarks: { _count: 'desc' as const } });
  if (order === 'newest') sortOptions.push({ created_at: 'desc' as const });

  let additionalJoin = {};

  if (userId)
    additionalJoin = {
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
    };

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
      ...additionalJoin,
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
  findBook,
  findBooks,
};
