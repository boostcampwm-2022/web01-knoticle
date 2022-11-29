import React, { useEffect, useState } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IBookScraps } from '@interfaces';

import EditBook from '../EditBook';
import { BookGrid, BookListTabWrapper, TabTitle, TabTitleContent } from './styled';

export default function BookListTab() {
  // 일단 에러 안 뜨게 새로 엮은 책 보여주기
  const [isModalShown, setModalShown] = useState(false);
  const [currentModalState, setCurrentModalState] = useState<'EditBook' | 'AddBook'>('EditBook');
  const [curEditBook, setCurEditBook] = useState<IBookScraps | null>(null);

  const { data: newestBookList, execute: getNewestBookList } =
    useFetch<IBookScraps[]>(getOrderedBookListApi);

  useEffect(() => {
    getNewestBookList('newest');
  }, []);

  const handleEditBookModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    // Html Dataset에는 객체를 담을 수 없어서 JSON을 통해 받음
    if (!e.currentTarget.dataset.book) return;
    setModalShown(true);
    setCurEditBook(JSON.parse(e.currentTarget.dataset.book));
    setCurrentModalState('EditBook');
  };
  const handleModalClose = () => {
    setModalShown(false);
    setCurrentModalState('EditBook');
  };
  const handleEditBookClicked = () => setCurrentModalState('EditBook');
  const handleAddBookClicked = () => setCurrentModalState('AddBook');

  return (
    <BookListTabWrapper>
      <TabTitle>
        <TabTitleContent>엮은 책</TabTitleContent>
        <TabTitleContent>북마크한 책</TabTitleContent>
      </TabTitle>
      <BookGrid>
        {newestBookList &&
          newestBookList.map((book) => (
            <Book key={book.id} book={book} handleEditBookModalOpen={handleEditBookModalOpen} />
          ))}
      </BookGrid>
      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBook book={curEditBook} />}
          <Button theme="primary" onClick={() => console.log('수정!')}>
            수정하기
          </Button>
        </Modal>
      )}
    </BookListTabWrapper>
  );
}
