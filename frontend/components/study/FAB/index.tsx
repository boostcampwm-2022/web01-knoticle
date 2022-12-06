import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { deleteBookApi, editBookApi } from '@apis/bookApi';
import Add from '@assets/ico_add.svg';
import CheckWhite from '@assets/ico_check_white.svg';
import EditWhite from '@assets/ico_edit_white.svg';
import editInfoState from '@atoms/editInfo';
import Modal from '@components/common/Modal';
import useFetch from '@hooks/useFetch';
import { toastSuccess } from '@utils/toast';

import AddBook from '../AddBook';
import { FabButton, FabWrapper } from './styled';

interface FabProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function FAB({ isEditing, setIsEditing }: FabProps) {
  const {
    data: deletedBook,
    setData: setDeletedBook,
    execute: deleteBook,
  } = useFetch(deleteBookApi);
  const { data: editBookData, setData: setEditBookData, execute: editBook } = useFetch(editBookApi);

  const [editInfo, setEditInfo] = useRecoilState(editInfoState);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => {
    setModalShown(true);
  };
  const handleModalClose = () => {
    setModalShown(false);
  };

  const handleEditFinishBtnClick = () => {
    setIsEditing(false);
    editInfo.deleted.forEach((bookId) => {
      deleteBook(bookId);
    });
    editInfo.editted.forEach((edit) => {
      editBook(edit);
    });
  };

  useEffect(() => {
    if (!deletedBook) return;

    setEditInfo({
      ...editInfo,
      deleted: editInfo.deleted.filter((id) => id !== deletedBook.id),
    });
  }, [deletedBook]);

  useEffect(() => {
    if (!editBookData) return;

    setEditInfo({
      ...editInfo,
      editted: editInfo.editted.filter((edit) => edit.id !== editBookData.id),
    });
  }, [editBookData]);

  useEffect(() => {
    console.log(deletedBook, editBookData, editInfo);
    if (
      (deletedBook || editBookData) &&
      editInfo.deleted.length === 0 &&
      editInfo.editted.length === 0
    ) {
      setDeletedBook(undefined);
      setEditBookData(undefined);
      toastSuccess(`수정 완료되었습니다`);
    }
  }, [deletedBook, editBookData]);

  return (
    <FabWrapper>
      <FabButton>
        <Image src={Add} alt="책 추가" onClick={handleModalOpen} />
      </FabButton>

      {isEditing ? (
        <FabButton isGreen onClick={handleEditFinishBtnClick}>
          <Image src={CheckWhite} alt="책 수정 완료" />
        </FabButton>
      ) : (
        <FabButton
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <Image src={EditWhite} alt="책 수정" />
        </FabButton>
      )}
      {isModalShown && (
        <Modal title="책 추가하기" handleModalClose={handleModalClose}>
          <AddBook handleModalClose={handleModalClose} />
        </Modal>
      )}
    </FabWrapper>
  );
}
