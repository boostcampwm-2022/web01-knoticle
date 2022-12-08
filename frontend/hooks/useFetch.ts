/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

import { toastError } from '@utils/toast';

const useFetch = <T>(api: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const execute = useCallback(async (...args: any[]) => {
    try {
      setData(await api(...args));
      setIsLoading(false);
    } catch (error: any) {
      const { message } = error.response.data;

      toastError(message);
    }
  }, []);

  return { data, isLoading, execute };
};

export default useFetch;
