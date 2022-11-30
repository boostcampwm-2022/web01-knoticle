import { IBookmark } from './bookmark.interface';
import { IUser } from './user.interface';

export interface IBook {
  id: number;
  title: string;
  user: IUser;
  _count: {
    bookmarks: number;
  };
  bookmarks: IBookmark[];
}
