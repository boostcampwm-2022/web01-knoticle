import api from '@utils/api';

interface CreateArticleApi {
  title: string;
  content: string;
  book_id: number;
  order: number;
}

// eslint-disable-next-line import/prefer-default-export
export const createArticleApi = async (data: CreateArticleApi) => {
  const url = `/api/articles`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
