import { CreateArticle } from '@apis/article/article.interface';
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

export default {
  createArticle,
};
