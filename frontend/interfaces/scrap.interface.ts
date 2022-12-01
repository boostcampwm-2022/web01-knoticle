import { IArticle } from './article.interface';

export interface IScrap {
  id: number;
  order: number;
  article: IArticle;
}
export interface IEditScrap {
  id: number;
  order: number;
  article: {
    id: number;
    title: string;
  };
}
