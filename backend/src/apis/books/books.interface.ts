export interface FindBooks {
  order: 'newest' | 'bookmark';
  take: number;
  userId?: number;
  editor?: string;
}

export interface SearchBooks {
  query: string;
  page: number;
  take: number;
  userId?: number;
}
