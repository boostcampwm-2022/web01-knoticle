import { CreateArticle, CreateTemporaryArticle } from '@apis/articles/articles.interface';
import { prisma } from '@config/orm.config';

const getArticle = async (articleId: number) => {
  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      deleted_at: true,
      book_id: true,
      book: {
        select: {
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      },
    },
  });

  return article;
};

const createArticle = async (dto: CreateArticle) => {
  const { title, content, book_id } = dto;

  const article = await prisma.article.create({
    data: {
      title,
      content,
      book: {
        connect: {
          id: book_id,
        },
      },
    },
  });

  return article;
};

const deleteArticle = async (articleId: number) => {
  await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

const createTemporaryArticle = async (dto: CreateTemporaryArticle) => {
  const { title, content, user_id } = dto;

  const temporaryArticle = await prisma.temporaryArticle.upsert({
    where: {
      user_id,
    },
    update: {
      title,
      content,
    },
    create: {
      user_id,
      title,
      content,
    },
  });

  return temporaryArticle;
};

const getTemporaryArticle = async (userId: number) => {
  const temporaryArticle = await prisma.temporaryArticle.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      title: true,
      content: true,
    },
  });

  return temporaryArticle;
};

export default {
  getArticle,
  createArticle,
  deleteArticle,
  getTemporaryArticle,
  createTemporaryArticle,
};
