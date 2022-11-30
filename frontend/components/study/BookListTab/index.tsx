import React, { useState } from 'react';

import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import EditBook from '@components/study/EditBook';
import FAB from '@components/study/FAB';
import { IBookScraps } from '@interfaces';

import { BookGrid, BookListTabWrapper, TabTitle, TabTitleContent } from './styled';

interface BookListTabProps {
  knottedBookList: IBookScraps[];
  bookmarkedBookList: IBookScraps[];
  isUserMatched: boolean;
}

export default function BookListTab({
  knottedBookList,
  bookmarkedBookList,
  isUserMatched,
}: BookListTabProps) {
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

      {isUserMatched && tabStatus === 'knotted' && <FAB />}

      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBook book={curEditBook} />}
        </Modal>
      )}
    </BookListTabWrapper>
  );
}
