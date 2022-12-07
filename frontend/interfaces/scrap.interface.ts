import { IArticle } from './article.interface';

export interface IScrap {
  id: number;
  order: number;
  article: IArticle;
}
