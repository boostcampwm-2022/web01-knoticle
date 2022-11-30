export interface SearchBooks {
  query: string;
  page: number;
  take: number;
  userId?: number;
}

export interface FindBooks {
  order: 'newest' | 'bookmark';
  take: number;
  userId?: number;
  editor?: string;
}

export interface CreateBook {
  title: string;
  userId: number;
}
