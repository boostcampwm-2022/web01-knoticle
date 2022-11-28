import { IArticle } from './article.interface';
import { IBook } from './book.interface';
import { IScrap } from './scrap.interface';

export interface IBookScraps extends IBook {
  scraps: IScrap[];
}

export interface IArticleBook extends IArticle {
  book: IBook;
}
