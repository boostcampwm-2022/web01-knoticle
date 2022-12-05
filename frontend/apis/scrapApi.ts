import api from '@utils/api';

export const getScrapsApi = async () => {
  const url = '/api/scraps';

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface CreateScrapApi {
  order: number;
  is_original: boolean;
  book_id: number;
  article_id: number;
}

export const createScrapApi = async (data: CreateScrapApi) => {
  const url = `/api/scraps`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
