import { prisma } from '@config/orm.config';
import { Message, NotFound, ResourceConflict } from '@errors';

const createBookmark = async (user_id: number, book_id: number) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      user_id,
      book_id,
    },
  });

  if (bookmark) throw new ResourceConflict(Message.BOOKMARK_ALREADY_EXISTS);

  const { id } = await prisma.bookmark.create({
    data: {
      user_id,
      book_id,
    },
  });

  return id;
};

const deleteBookmark = async (id: number) => {
  try {
    const bookmark = await prisma.bookmark.delete({
      where: {
        id,
      },
    });

    return bookmark;
  } catch (err) {
    throw new NotFound(Message.BOOKMARK_NOTFOUND);
  }
};

export default {
  createBookmark,
  deleteBookmark,
};
