import { useEffect, useState } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [value, setStateValue] = useState<T>(initialValue);
  const [isValueSet, setIsValueSet] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsValueSet(true);
      const savedValue = sessionStorage.getItem(key);
      if (savedValue) setStateValue(JSON.parse(savedValue));
    }
  }, [typeof window]);

  const setValue = (newValue: T) => {
    setStateValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, isValueSet, setValue };
};

export default useSessionStorage;
