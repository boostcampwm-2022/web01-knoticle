import api from '@utils/api';

interface LocalLoginApi {
  username: string;
  password: number;
}

interface CreateUserApi extends LocalLoginApi {
  nickname: string;
}

export const createUserApi = async (data: CreateUserApi) => {
  const url = `/api/auth/signup`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};

export const localLoginApi = async (data: LocalLoginApi) => {
  const url = `/api/auth/signin/local`;

  const response = await api({ url, method: 'POST', data });

  return response.data;
};
