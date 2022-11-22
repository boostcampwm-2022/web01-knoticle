import { Request, Response } from 'express';

import articleService from '@apis/articles/articles.service';

const getArticle = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const articleData = await articleService.getArticleData(articleId);

  // 쿠키에서 유저아이디 검출 미들웨어 추가 -> req.userId -> 북마크 확인

  res.status(200).send(articleData);
};

export default {
  getArticle,
};
