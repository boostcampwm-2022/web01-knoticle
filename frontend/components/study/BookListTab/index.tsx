import React, { useState } from 'react';

import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import { IBookScraps } from '@interfaces';

import EditBook from '../EditBook';
import { BookGrid, BookListTabWrapper, TabTitle, TabTitleContent } from './styled';

interface BookListTabProps {
  knottedBookList: IBookScraps[];
  bookmarkedBookList: IBookScraps[];
}

export default function BookListTab({ knottedBookList, bookmarkedBookList }: BookListTabProps) {
  // 일단 에러 안 뜨게 새로 엮은 책 보여주기
  const [isModalShown, setModalShown] = useState(false);
  const [curEditBook, setCurEditBook] = useState<IBookScraps | null>(null);
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');

  const handleEditBookModalOpen = (id: number) => {
    const curbook = knottedBookList?.find((v) => v.id === id);
    if (!curbook) return;
    setModalShown(true);
    setCurEditBook(curbook);
  };
  const handleModalClose = () => {
    setModalShown(false);
  };

  return (
    <BookListTabWrapper>
      <TabTitle>
        <TabTitleContent
          onClick={() => {
            setTabStatus('knotted');
          }}
          isActive={tabStatus === 'knotted'}
        >
          엮은 책
        </TabTitleContent>
        <TabTitleContent
          onClick={() => {
            setTabStatus('bookmarked');
          }}
          isActive={tabStatus === 'bookmarked'}
        >
          북마크한 책
        </TabTitleContent>
      </TabTitle>
      {tabStatus === 'knotted' ? (
        <BookGrid>
          {knottedBookList &&
            knottedBookList.map((book) => (
              <Book
                key={book.id}
                book={book}
                handleEditBookModalOpen={() => {
                  handleEditBookModalOpen(book.id);
                }}
              />
            ))}
        </BookGrid>
      ) : (
        <BookGrid>
          {bookmarkedBookList &&
            bookmarkedBookList.map((book) => (
              <Book
                key={book.id}
                book={book}
                handleEditBookModalOpen={() => {
                  handleEditBookModalOpen(book.id);
                }}
              />
            ))}
        </BookGrid>
      )}

      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBook book={curEditBook} />}
        </Modal>
      )}
    </BookListTabWrapper>
  );
}
