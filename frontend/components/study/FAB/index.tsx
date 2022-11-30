import Image from 'next/image';

import { useState } from 'react';

import Add from '@assets/ico_add.svg';
import CheckWhite from '@assets/ico_check_white.svg';
import EditWhite from '@assets/ico_edit_white.svg';
import Modal from '@components/common/Modal';

import AddBook from '../AddBook';
import { FabButton, FabWrapper } from './styled';

interface FabProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function FAB({ isEditing, setIsEditing }: FabProps) {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => {
    setModalShown(true);
  };
  const handleModalClose = () => {
    setModalShown(false);
  };

  return (
    <FabWrapper>
      <FabButton>
        <Image src={Add} alt="책 추가" onClick={handleModalOpen} />
      </FabButton>

      {isEditing ? (
        <FabButton isGreen>
          <Image
            src={CheckWhite}
            alt="책 수정 완료"
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </FabButton>
      ) : (
        <FabButton>
          <Image
            src={EditWhite}
            alt="책 수정"
            onClick={() => {
              setIsEditing(true);
            }}
          />
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
