import api from '@utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getUserProfileApi = async (nickname: string) => {
  const url = `/api/users?nickname=${nickname}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};
