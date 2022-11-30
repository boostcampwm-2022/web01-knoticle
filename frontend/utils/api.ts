import axios from 'axios';

interface Api {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  header?: Record<string, string>;
  data?: unknown;
  params?: unknown;
}

const api = async ({ url, method, header, data, params }: Api) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...header,
  };

  const response = await axios({
    url: process.env.NEXT_PUBLIC_SERVER_URL + url,
    method,
    headers,
    data,
    params,
    withCredentials: true,
  });

  return response;
};

export default api;
