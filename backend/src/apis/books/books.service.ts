import { prisma } from '@config/orm.config';

import { FindBooks, SearchBooks } from './books.interface';

const findBook = async (bookId: number, userId: number) => {
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
              deleted_at: true,
            },
          },
        },
      },
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      id: bookId,
      deleted_at: null,
    },
  });

  return book;
};

const findBooks = async ({ order, take, userId, editor }: FindBooks) => {
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
      bookmarks: {
        where: {
          user_id: userId,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      deleted_at: null,
      user: {
        is: {
          nickname: editor ? editor : undefined,
        },
      },
    },
    orderBy: sortOptions,
    take,
  });

  return books;
};

const searchBooks = async ({ query, userId, page }: SearchBooks) => {
  const skip = (page - 1) * 10;

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
      bookmarks: {
        where: {
          user_id: userId ? Number(userId) : 0,
        },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
    where: {
      deleted_at: null,
      user_id: userId ? Number(userId) : undefined,
      title: {
        search: `${query}*`,
      },
    },
    skip,
    take: 10,
  });

  return books;
};

export default {
  findBook,
  findBooks,
  searchBooks,
};
