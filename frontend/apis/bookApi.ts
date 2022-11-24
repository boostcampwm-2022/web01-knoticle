import api from '@utils/api';

interface GetBooksApi {
  order: 'newest' | 'bookmark';
  take: number;
}

// NOTE: 서버에서 take가 없을 때 최대로

export const getBooksApi = async (data: GetBooksApi) => {
  const url = `/api/books?order=${data.order}&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const getOrderedBookListApi = async (order: string) => {
  const url = `/api/books?order=${order}&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
