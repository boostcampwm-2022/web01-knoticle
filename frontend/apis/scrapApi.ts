import api from '@utils/api';

interface CreateScrapApi {
  order: number;
  is_original: boolean;
  book_id: number;
  article_id: number;
}

// eslint-disable-next-line import/prefer-default-export
export const createScrapApi = async (data: CreateScrapApi) => {
  const url = `/api/scraps`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const deleteScrapApi = async (scrapId: string) => {
  const url = `/api/scraps/${scrapId}`;

  const response = await api({ url, method: 'DELETE' });

  return response.data;
};
