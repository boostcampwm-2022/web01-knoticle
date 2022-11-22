import { prisma } from '@config/orm.config';

const createArticle = async (title: string, contents: string, book_id: number) => {
  console.log(title, 111);
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
