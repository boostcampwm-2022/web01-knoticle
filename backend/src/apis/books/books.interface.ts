export interface FindBooks {
  order: 'newest' | 'bookmark';
  take: number;
  userId?: number;
  editor?: string;
}
