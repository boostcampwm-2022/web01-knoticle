import { CreateArticle, CreateTemporaryArticle } from '@apis/article/article.interface';
import { prisma } from '@config/orm.config';

const createArticle = async (dto: CreateArticle) => {
  const { title, contents, book_id } = dto;

  const article = await prisma.article.create({
    data: {
      title,
      contents,
      book: {
        connect: {
          id: book_id,
        },
      },
    },
  });

  return article;
};

const createTemporaryArticle = async (dto: CreateTemporaryArticle) => {
  const { title, contents, user_id } = dto;

  const temporaryArticle = await prisma.temporaryArticle.create({
    data: {
      title,
      contents,
      user: {
        connect: {
          id: user_id,
        },
      },
    },
  });

  return temporaryArticle;
};

export default {
  createArticle,
  createTemporaryArticle,
};
