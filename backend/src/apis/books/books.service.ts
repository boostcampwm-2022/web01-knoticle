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
        // 북마크 수
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
