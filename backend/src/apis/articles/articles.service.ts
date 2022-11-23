import { CreateArticle, CreateTemporaryArticle } from '@apis/articles/articles.interface';
import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

const getArticleData = async (articleId: number) => {
  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      contents: true,
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

  if (!article) throw new NotFound(Message.ARTICLE_NOTFOUND);

  return article;
};

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

  const temporaryArticle = await prisma.temporaryArticle.upsert({
    where: {
      user_id,
    },
    update: {
      title,
      contents,
    },
    create: {
      user_id,
      title,
      contents,
    },
  });

  return temporaryArticle;
};

const findTemporaryArticle = async (userId: number) => {
  const temporaryArticle = await prisma.temporaryArticle.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      title: true,
      contents: true,
    },
  });

  return temporaryArticle;
};
const deleteArticle = async (articleId: number) => {
  const deletedAtArticle = await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

export default {
  getArticleData,
  createArticle,
  createTemporaryArticle,
  findTemporaryArticle,
  deleteArticle,
};
