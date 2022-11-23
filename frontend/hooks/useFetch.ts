/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

const useFetch = <T>(api: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T>();

  const execute = useCallback(async (...args: any[]) => {
    try {
      setData(await api(...args));
    } catch (error: any) {
      const { message } = error.response.data;

      console.log(message);
    }
  }, []);

  return { data, execute };
};

export default useFetch;
