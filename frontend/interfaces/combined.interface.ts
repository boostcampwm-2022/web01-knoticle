import { IArticle } from './article.interface';
import { IBook } from './book.interface';
import { IEditScrap } from './scrap.interface';

export interface IEditBookScraps extends IBook {
  scraps: IEditScrap[];
}

export interface IArticleBook extends IArticle {
  book: IBook;
}
