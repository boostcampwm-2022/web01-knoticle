import { IScrap } from '@interfaces';
import api from '@utils/api';

interface SearchBooksApi {
  query: string;
  userId: number;
  page: number;
  take: number;
}

export const searchBooksApi = async (data: SearchBooksApi) => {
  const url = `/api/books/search`;
  const params = {
    query: data.query,
    userId: data.userId,
    page: data.page,
    take: data.take,
  };

  const response = await api({ url, method: 'GET', params });

  return response.data;
};

interface GetBooksApi {
  order: 'newest' | 'bookmark';
  take: number;
}

interface EditBookApi {
  id: number;
  title: string;
  thumbnail_image: string;
  scraps: IScrap[];
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

export const getBookApi = async (bookId: string) => {
  const url = `/api/books/${bookId}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const getUserKnottedBooksApi = async (nickname: string) => {
  const url = `/api/books?editor=${nickname}&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const getUserBookmarkedBooksApi = async (nickname: string) => {
  const url = `/api/books?editor=${nickname}&type=bookmark&take=12`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

export const addBookApi = async (data: { title: string }) => {
  const url = `/api/books`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const editBookApi = async (data: EditBookApi) => {
  const url = `/api/books`;

  const response = await api({ url, method: 'PATCH', data });

  return response.data;
};

export const deleteBookApi = async (bookId: number) => {
  const url = `/api/books/${bookId}`;

  const response = await api({ url, method: 'DELETE' });

  return response.data;
};
