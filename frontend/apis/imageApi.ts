import api from '@utils/api';

// eslint-disable-next-line import/prefer-default-export
export const createImageApi = async (data: FormData) => {
  const url = `/api/image`;
  const header = {
    'Content-Type': 'multipart/form-data',
  };

  const response = await api({ url, method: 'POST', header, data });

  return response.data;
};
