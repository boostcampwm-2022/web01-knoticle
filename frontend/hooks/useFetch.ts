/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const useFetch = <T>(api: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T>();

  const execute = useCallback(async (...args: any[]) => {
    try {
      setData(await api(...args));
    } catch (error: any) {
      const { message } = error.response.data;

      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, []);

  return { data, execute };
};

export default useFetch;
