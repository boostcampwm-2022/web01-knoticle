import api from '@utils/api';

interface CreateArticleApi {
  title: string;
  content: string;
  book_id: number;
  order: number;
}

export const createArticleApi = async (data: CreateArticleApi) => {
  const url = `/api/articles`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const getArticleApi = async (articleId: string) => {
  const url = `/api/articles/${articleId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
