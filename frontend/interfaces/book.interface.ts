import { Bookmark } from './bookmark.interface';
import { Scrap } from './scrap.interface';
import { User } from './user.interface';

export interface Book {
  id: number;
  title: string;
  user: User;
  scraps: Scrap[];
  _count: {
    bookmarks: number;
  };
  bookmarks: Bookmark[];
}
