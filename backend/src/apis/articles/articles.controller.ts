import { Request, Response } from 'express';

import articleService from '@apis/articles/articles.service';

const getArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const articleData = await articleService.getArticleData(articleId);

  res.status(200).send(articleData);
};

export default {
  getArticle,
};
