import { Request, Response } from 'express';

import scrapService from '@apis/scrap/scrap.service';

import articleService from './article.service';

const publish = async (req: Request, res: Response) => {
  const { title, content, book_id, order } = req.body;

  const article = await articleService.createArticle({
    title,
    content,
    book_id,
  });

  const scrap = await scrapService.createScrap({
    order,
    is_original: true,
    book_id,
    article_id: article.id,
  });

  res.status(201).send({ article, scrap });
};

const saveTemporaryArticle = async (req: Request, res: Response) => {
  const { title, content, user_id } = req.body;

  const temporaryArticle = await articleService.createTemporaryArticle({
    title,
    content,
    user_id,
  });

  res.status(201).send({ temporaryArticle });
};

const getTemporaryArticle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  const temporaryArticle = await articleService.findTemporaryArticle(userId);

  res.status(201).send({ temporaryArticle });
};

export default { publish, saveTemporaryArticle, getTemporaryArticle };
