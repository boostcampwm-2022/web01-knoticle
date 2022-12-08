import { Request, Response } from 'express';

import { SearchArticles } from '@apis/articles/articles.interface';
import articlesService from '@apis/articles/articles.service';
import { IScrap } from '@apis/scraps/scraps.interface';
import scrapsService from '@apis/scraps/scraps.service';

const searchArticles = async (req: Request, res: Response) => {
  const { query, page, take, userId } = req.query as unknown as SearchArticles;

  const searchResult = await articlesService.searchArticles({ query, page, take: +take, userId });

  res.status(200).send(searchResult);
};

const getArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const articleData = await articlesService.getArticle(articleId);

  res.status(200).send(articleData);
};

const createArticle = async (req: Request, res: Response) => {
  const { article, scraps } = req.body;

  const createdArticle = await articlesService.createArticle({
    title: article.title,
    content: article.content,
    book_id: article.book_id,
  });
  // forEach와 async,await을 같이사용하는 것이 맞나? 다른방법은 없나?
  scraps.forEach(async (scrap: IScrap) => {
    if (scrap.id === 0) {
      await scrapsService.createScrap({
        order: scrap.order,
        is_original: true,
        book_id: article.book_id,
        article_id: createdArticle.id,
      });
    } else {
      await scrapsService.updateScrapOrder(scrap);
    }
  });
  res.status(201).send({ createdArticle });
};

const deleteArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);

  await articlesService.deleteArticle(articleId);

  res.status(204).send();
};

const getTemporaryArticle = async (req: Request, res: Response) => {
  if (!res.locals.user) return res.status(200).send();

  const userId = res.locals.user.id;
  const temporaryArticle = await articlesService.getTemporaryArticle(userId);

  res.status(200).send(temporaryArticle);
};

const createTemporaryArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const userId = res.locals.user.id;

  const temporaryArticle = await articlesService.createTemporaryArticle({
    title,
    content,
    user_id: userId,
  });

  res.status(201).send(temporaryArticle);
};

const updateArticle = async (req: Request, res: Response) => {
  const { article, scraps } = req.body;

  const articleId = Number(req.params.articleId);

  const modifiedArticle = await articlesService.updateArticle(articleId, {
    title: article.title,
    content: article.content,
    book_id: article.book_id,
  });

  const result: any[] = [];
  scraps.forEach(async (scrap: IScrap) => {
    if (scrap.id === 0) {
      result.push(await scrapsService.updateScrapBookId(articleId, article.book_id, scrap));
    } else {
      result.push(await scrapsService.updateScrapOrder(scrap));
    }
  });
  res.status(201).send({ modifiedArticle, result });
};

export default {
  searchArticles,
  getArticle,
  createArticle,
  deleteArticle,
  getTemporaryArticle,
  createTemporaryArticle,
  updateArticle,
};
