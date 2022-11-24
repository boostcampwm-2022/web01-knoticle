import api from '@utils/api';

interface GetBooksApi {
  userId: string;
}

export const getBooksApi = async (data: GetBooksApi) => {
  const url = `/api/books?user=${data.userId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface GetOrderedBookListApi {
  order: string;
}

export const getOrderedBookListApi = async (data: GetOrderedBookListApi) => {
  const url = `/api/books?order=${data.order}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
