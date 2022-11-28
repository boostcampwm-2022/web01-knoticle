import api from '@utils/api';

interface LocalSignInApi {
  data: { username: string; password: string };
  cb: () => void;
}

interface GithubSignInApi {
  data: { code: string };
  cb: () => void;
}

export const localSignInApi = async ({ data, cb }: LocalSignInApi) => {
  const url = '/api/auth/signin/local';

  const response = await api({ url, method: 'POST', data });
  cb();

  return response.data;
};

export const githubSingInApi = async ({ data, cb }: GithubSignInApi) => {
  const url = '/api/auth/signin/github';

  const response = await api({ url, method: 'POST', data });
  cb();

  return response.data;
};
