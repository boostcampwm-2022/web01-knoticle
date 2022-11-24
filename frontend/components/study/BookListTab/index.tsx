import { useEffect } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import useFetch from '@hooks/useFetch';
import { BookData } from '@interfaces';

import { BookGrid, BookListTabWrapper, TabTitle, TabTitleContent } from './styled';

export default function BookListTab() {
  // 일단 에러 안 뜨게 새로 엮은 책 보여주기

  const { data: newestBookList, execute: getNewestBookList } =
    useFetch<BookData[]>(getOrderedBookListApi);

  useEffect(() => {
    getNewestBookList('newest');
  }, []);

  return (
    <BookListTabWrapper>
      <TabTitle>
        <TabTitleContent>엮은 책</TabTitleContent>
        <TabTitleContent>북마크한 책</TabTitleContent>
      </TabTitle>
      <BookGrid>
        {newestBookList && newestBookList.map((book) => <Book key={book.id} book={book} />)}
      </BookGrid>
    </BookListTabWrapper>
  );
}
