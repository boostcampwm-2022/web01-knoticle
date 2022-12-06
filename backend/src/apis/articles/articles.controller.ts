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
      await scrapsService.updateScraps(scrap);
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
  const userId = Number(req.params.userId);

  const temporaryArticle = await articlesService.getTemporaryArticle(userId);

  res.status(200).send({ temporaryArticle });
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

export default {
  searchArticles,
  getArticle,
  createArticle,
  deleteArticle,
  getTemporaryArticle,
  craeteTemporaryArticle,
};
