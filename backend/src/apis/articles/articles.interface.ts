export interface SearchArticles {
  query: string;
  page: number;
  user_id: number;
}

export interface CreateArticle {
  title: string;
  content: string;
  book_id: number;
}

export interface CreateTemporaryArticle {
  title: string;
  content: string;
  user_id: number;
}
