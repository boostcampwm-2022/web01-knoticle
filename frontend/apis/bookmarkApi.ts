import api from '@utils/api';

interface PostBookmarkApi {
  book_id: number;
}

interface DeleteBookmarkApi {
  bookmarkId: number;
}

// eslint-disable-next-line import/prefer-default-export
export const postBookmarkApi = async (data: PostBookmarkApi) => {
  const url = `/api/bookmarks`;

  const response = await api({
    url,
    method: 'POST',
    data,
  });

  return response.data;
};

export const deleteBookmarkApi = async (data: DeleteBookmarkApi) => {
  const url = `/api/bookmarks/${data.bookmarkId}`;

  const response = await api({
    url,
    method: 'DELETE',
  });

  return response.data;
};
