import { IUser } from '@interfaces';
import api from '@utils/api';

export const getUserProfileApi = async (nickname: string) => {
  const url = `/api/users?nickname=${nickname}`;

  const response = await api({ url, method: 'GET' });

  return response.data;
};

interface UpdateUserProfileApi {
  userProfile: IUser;
}

export const updateUserProfileApi = async (data: UpdateUserProfileApi) => {
  const url = `/api/users/${data.userProfile.id}`;

  const response = await api({ url, method: 'PATCH', data });

  return response.data;
};
