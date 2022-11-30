import {
  CreateArticle,
  CreateTemporaryArticle,
  SearchArticles,
} from '@apis/articles/articles.interface';
import { prisma } from '@config/orm.config';

const searchArticles = async (searchArticles: SearchArticles) => {
  const { query, page, take, userId } = searchArticles;

  const skip = (page - 1) * take;

  const matchUserCondition = Number(userId)
    ? {
        book: {
          user: {
            id: Number(userId),
          },
        },
      }
    : {};

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      book: {
        select: {
          user: {
            select: {
              id: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
    },
    where: {
      title: {
        search: `${query}*`,
      },
      content: {
        search: `${query}*`,
      },
      deleted_at: null,
      ...matchUserCondition,
    },
    take,
    skip,
  });

  return {
    data: articles,
    hasNextPage: articles.length === take,
  };
};

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

export default {
  searchArticles,
  getArticle,
  createArticle,
  deleteArticle,
  getTemporaryArticle,
  createTemporaryArticle,
};
