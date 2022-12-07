import { useEffect } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import useFetch from '@hooks/useFetch';

export default function Booktest() {
  const {
    data: popularBookList,
    isLoading: isPopularBookListLoading,
    execute: getPopularBookList,
  } = useFetch(getOrderedBookListApi);

  useEffect(() => {
    getPopularBookList('bookmark');
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      {popularBookList && (
        <>
          <Book book={popularBookList[0]} /> <Book book={popularBookList[0]} />
        </>
      )}
    </div>
  );
}
