import { RefObject, useEffect, useState } from 'react';

const useScrollDetector = (element: RefObject<HTMLDivElement>, threshold: number) => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    if (!element.current) return undefined;

    let prevScrollTop = element.current.scrollTop;

    const scrolledMoreThanThreshold = (curScrollTop: number) =>
      Math.abs(curScrollTop - prevScrollTop) > threshold;

    const isScrollingDown = (curScrollTop: number) =>
      curScrollTop > prevScrollTop &&
      !(prevScrollTop > 0 && curScrollTop === 0) &&
      !(curScrollTop > 0 && prevScrollTop === 0);

    const updateScrollDirection = (targetElement: HTMLElement | null) => {
      if (!targetElement) return;
      const curScrollTop = targetElement.scrollTop;

      if (scrolledMoreThanThreshold(curScrollTop)) {
        setIsScrollDown(isScrollingDown(curScrollTop));
        prevScrollTop = curScrollTop > 0 ? curScrollTop : 0;
      }
    };

    const onScroll = () => updateScrollDirection(element.current);

    element.current.addEventListener('scroll', onScroll);

    return () => {
      if (element.current) element.current.removeEventListener('scroll', onScroll);
    };
  }, [element]);

  return isScrollDown;
};

export default useScrollDetector;
