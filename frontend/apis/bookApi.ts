import api from '@utils/api';

interface GetBooksApi {
  userId: string;
}

// eslint-disable-next-line import/prefer-default-export
export const getBooksApi = async (data: GetBooksApi) => {
  const url = `/api/books?user=${data.userId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
