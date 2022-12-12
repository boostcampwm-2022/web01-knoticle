import { useState } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const savedValue = sessionStorage.getItem(key);

  const [value, setStateValue] = useState<T>(
    savedValue === null ? initialValue : JSON.parse(savedValue)
  );

  const setValue = (newValue: T) => {
    setStateValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setValue };
};

export default useSessionStorage;
