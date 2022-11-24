import api from '@utils/api';

interface GetBooksApi {
  userId: string;
}

export const getBooksApi = async (data: GetBooksApi) => {
  const url = `/api/books?user=${data.userId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const getOrderedBookListApi = async (order: string) => {
  const url = `/api/books?order=${order}&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
