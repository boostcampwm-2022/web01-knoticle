import { prisma } from '@config/orm.config';

const createBookmark = async (user_id: number, book_id: number) => {
  const { id } = await prisma.bookmark.create({
    data: {
      user_id,
      book_id,
    },
  });
  return id;
};

export default {
  createBookmark,
};
