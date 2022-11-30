import React, { useState } from 'react';

import { useRecoilState } from 'recoil';

import MinusWhite from '@assets/ico_minus_white.svg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import editInfoState from '@atoms/editInfo';
import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import EditBook from '@components/study/EditBook';
import FAB from '@components/study/FAB';
import { IBookScraps } from '@interfaces';

import {
  BookGrid,
  BookListTabWrapper,
  EditBookWrapper,
  EditModeIndicator,
  MinusButton,
  MinusIcon,
  TabTitle,
  TabTitleContent,
} from './styled';

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
  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [editInfo, setEditInfo] = useRecoilState(editInfoState);

  const [isModalShown, setModalShown] = useState(false);
  const [curEditBook, setCurEditBook] = useState<IBookScraps | null>(null);
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditBookModalOpen = (id: number) => {
    const curbook = knottedBookList?.find((v) => v.id === id);
    if (!curbook) return;

    setModalShown(true);
    setCurEditBook(curbook);
  };

  const handleModalClose = () => {
    setModalShown(false);
  };

  const handleMinusBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setCurKnottedBookList([...curKnottedBookList.filter((book) => id !== book.id)]);
    setEditInfo({
      ...editInfo,
      deleted: [...editInfo.deleted, id],
    });
  };

  return (
    <BookListTabWrapper>
      {isEditing && <EditModeIndicator>수정 모드</EditModeIndicator>}
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
            setIsEditing(false);
          }}
          isActive={tabStatus === 'bookmarked'}
        >
          북마크한 책
        </TabTitleContent>
      </TabTitle>
      {tabStatus === 'knotted' ? (
        <BookGrid>
          {knottedBookList &&
            knottedBookList.map((book) =>
              isEditing ? (
                <EditBookWrapper
                  key={book.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditBookModalOpen(book.id);
                  }}
                >
                  <MinusButton
                    onClick={(e) => {
                      handleMinusBtnClick(e, book.id);
                    }}
                  >
                    <MinusIcon src={MinusWhite} alt="책 삭제" />
                  </MinusButton>
                  <Book book={book} />
                </EditBookWrapper>
              ) : (
                <Book key={book.id} book={book} />
              )
            )}
        </BookGrid>
      ) : (
        <BookGrid>
          {bookmarkedBookList &&
            bookmarkedBookList.map((book) => <Book key={book.id} book={book} />)}
        </BookGrid>
      )}

      {isUserMatched && tabStatus === 'knotted' && (
        <FAB isEditing={isEditing} setIsEditing={setIsEditing} />
      )}

      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBook book={curEditBook} />}
        </Modal>
      )}
    </BookListTabWrapper>
  );
}
