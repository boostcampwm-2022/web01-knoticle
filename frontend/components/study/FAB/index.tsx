import Image from 'next/image';

import { useState } from 'react';

import Add from '@assets/ico_add.svg';
import EditWhite from '@assets/ico_edit_white.svg';
import Modal from '@components/common/Modal';

import AddBook from '../AddBook';
import { FabButton, FabWrapper } from './styled';

export default function FAB() {
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
      <FabButton>
        <Image src={EditWhite} alt="책 수정" />
      </FabButton>
      {isModalShown && (
        <Modal title="책 추가하기" handleModalClose={handleModalClose}>
          <AddBook />
        </Modal>
      )}
    </FabWrapper>
  );
}
