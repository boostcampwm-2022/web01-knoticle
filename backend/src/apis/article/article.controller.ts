import { Request, Response } from 'express';

import scrapService from '@apis/scrap/scrap.service';

import articleService from './article.service';

const publish = async (req: Request, res: Response) => {
  const { title, contents, book_id } = req.body;
  const article = await articleService.createArticle(title, contents, book_id);
  const scrap = await scrapService.createScrap({
    order: 1,
    is_original: true,
    book_id,
    article_id: article.id,
  });

  res.status(200).send({ article, scrap });
};

export default { publish };
