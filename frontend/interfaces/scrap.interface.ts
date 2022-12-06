import { IArticle } from './article.interface';

export interface IScrap {
  id: number;
  order: number;
  is_original: boolean;
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
