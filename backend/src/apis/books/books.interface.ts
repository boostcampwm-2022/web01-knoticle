export interface SearchBooks {
  query: string;
  page: number;
  take: number;
  userId?: number;
  isUsers?: string;
}

export interface FindBooks {
  order: 'newest' | 'bookmark';
  take: number;
  userId?: number;
  editor?: string;
  type?: 'bookmark';
}

export interface CreateBook {
  title: string;
  userId: number;
}
