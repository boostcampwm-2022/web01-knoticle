import { RefObject, useEffect, useState } from 'react';

const useIntersectionObserver = (elementRef: RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    const isElementIntersecting = entry.isIntersecting;
    setIntersecting(isElementIntersecting);
  };

  useEffect(() => {
    const target = elementRef?.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.1,
      rootMargin: '300px',
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [elementRef?.current]);

  return isIntersecting;
};

export default useIntersectionObserver;
