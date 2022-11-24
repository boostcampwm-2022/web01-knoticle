import { Article } from './article.interface';
import { Book } from './book.interface';
import { Bookmark } from './bookmark.interface';
import { Scrap } from './scrap.interface';
import { User } from './user.interface';

interface BookData {
  id: number;
  title: string;
  user: User;
  scraps: Scrap[];
  _count: {
    bookmarks: number;
  };
  bookmarks: Bookmark[];
}

export type { Article, Book, Bookmark, Scrap, User, BookData };
