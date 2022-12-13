import api from '@utils/api';

interface SearchArticlesApi {
  query: string;
  isUsers: boolean;
  page: number;
  take: number;
}

export const searchArticlesApi = async (data: SearchArticlesApi) => {
  const url = `/api/articles/search`;
  const params = {
    query: data.query,
    isUsers: data.isUsers,
    page: data.page,
    take: data.take,
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

export const modifyArticleApi = async (articleId: number, data: CreateArticleApi) => {
  const url = `/api/articles/${articleId}`;

  const response = await api({ url, method: 'PATCH', data });

  return response.data;
};

export const deleteArticleApi = async (articleId: number) => {
  const url = `/api/articles/${articleId}`;

  const response = await api({ url, method: 'DELETE' });

  return response.data;
};

export const getTemporaryArticleApi = async () => {
  const url = '/api/articles/temporary';

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface CreateTemporaryArticleApi {
  title: string;
  content: string;
}

export const createTemporaryArticleApi = async (data: CreateTemporaryArticleApi) => {
  const url = '/api/articles/temporary';

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
