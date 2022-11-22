import { Request, Response } from 'express';

import articleService from './article.service';

const publish = async (req: Request, res: Response) => {
  const { title, contents, book_id } = req.body;
  const article = await articleService.createArticle(title, contents, book_id);

  res.status(200).send({ article });
};

export default { publish };
