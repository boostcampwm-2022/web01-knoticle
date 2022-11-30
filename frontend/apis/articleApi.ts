import api from '@utils/api';

interface SearchArticlesApi {
  query: string;
  page: number;
  userId: number;
}

export const searchArticlesApi = async (data: SearchArticlesApi) => {
  const url = `/api/articles/search`;
  const params = {
    query: data.query,
    page: data.page,
    userId: data.userId,
  };

  const response = await api({ url, method: 'GET', params });

  return response.data;
};

export const getArticleApi = async (articleId: string) => {
  const url = `/api/articles/${articleId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

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
