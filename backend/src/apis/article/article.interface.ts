export interface CreateArticle {
  title: string;
  contents: string;
  book_id: number;
}

export interface CreateTemporaryArticle {
  title: string;
  contents: string;
  user_id: number;
}
