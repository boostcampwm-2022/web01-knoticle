import api from '@utils/api';

export const getUserProfileApi = async (nickname: string) => {
  const url = `/api/users?nickname=${nickname}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface UpdateUserProfileApi {
  id: number;
  nickname?: string;
  description?: string;
  profile_image?: string;
}

export const updateUserProfileApi = async (data: UpdateUserProfileApi) => {
  const url = `/api/users/${data.id}`;

  const response = await api({ url, method: 'PATCH', data });

  return response.data;
};
