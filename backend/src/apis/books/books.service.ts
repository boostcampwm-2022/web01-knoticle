import { FindBooks, SearchBooks, CreateBook } from '@apis/books/books.interface';
import { prisma } from '@config/orm.config';

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

const searchBooks = async ({ query, userId, take, page }: SearchBooks) => {
  const skip = (page - 1) * take;

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

const createBook = async ({ title, userId }: CreateBook) => {
  const book = await prisma.book.create({
    data: {
      title,
      thumbnail_image:
        'https://kr.object.ncloudstorage.com/j027/3947d647-f26e-43cc-9834-82d59703cd9c.png',
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return book;
};

export default {
  findBook,
  findBooks,
  searchBooks,
  createBook,
};
