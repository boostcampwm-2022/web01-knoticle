import { IArticle } from './article.interface';
import { IBook } from './book.interface';
import { IEditScrap, IScrap } from './scrap.interface';

export interface IBookScraps extends IBook {
  scraps: IScrap[];
}
export interface IEditBookScraps extends IBook {
  scraps: IEditScrap[];
}

export interface IArticleBook extends IArticle {
  book: IBook;
}
