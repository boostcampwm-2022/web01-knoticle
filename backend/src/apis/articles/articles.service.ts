import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

const getArticleData = async (articleId: number) => {
  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
  });

  if (!article) throw new NotFound(Message.ARTICLE_NOTFOUND);

  return article;
};

export default {
  getArticleData,
};
