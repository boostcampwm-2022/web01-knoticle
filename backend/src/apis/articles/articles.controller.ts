import { Request, Response } from 'express';

import articlesService from '@apis/articles/articles.service';
import scrapsService from '@apis/scraps/scraps.service';

const getArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const articleData = await articlesService.getArticle(articleId);

  res.status(200).send(articleData);
};

const createArticle = async (req: Request, res: Response) => {
  const { title, content, book_id, order } = req.body;

  const article = await articlesService.createArticle({
    title,
    content,
    book_id,
  });

  const scrap = await scrapsService.createScrap({
    order,
    is_original: true,
    book_id,
    article_id: article.id,
  });

  res.status(201).send({ article, scrap });
};

const deleteArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);

  await articlesService.deleteArticle(articleId);

  res.status(204).send();
};

const craeteTemporaryArticle = async (req: Request, res: Response) => {
  const { title, content, user_id } = req.body;

  const temporaryArticle = await articlesService.createTemporaryArticle({
    title,
    content,
    user_id,
  });

  res.status(201).send({ temporaryArticle });
};

const getTemporaryArticle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  const temporaryArticle = await articlesService.getTemporaryArticle(userId);

  res.status(201).send({ temporaryArticle });
};

export default {
  getArticle,
  createArticle,
  deleteArticle,
  getTemporaryArticle,
  craeteTemporaryArticle,
};
