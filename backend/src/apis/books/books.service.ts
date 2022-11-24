import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

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
    },
  });

  if (!book) throw new NotFound(Message.BOOK_NOTFOUND);

  return book;
};

export default {
  getBookData,
};
