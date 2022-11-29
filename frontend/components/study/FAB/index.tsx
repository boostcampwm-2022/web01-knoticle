import Image from 'next/image';

import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import Add from '@assets/ico_add.svg';
import EditWhite from '@assets/ico_edit_white.svg';
import signInStatusState from '@atoms/signInStatus';
import Modal from '@components/common/Modal';
import Button from '@components/common/Modal/ModalButton';

import AddBook from '../AddBook';
import { FabButton, FabWrapper } from './styled';

export default function FAB() {
  const [isModalShown, setModalShown] = useState(false);
  const user = useRecoilValue(signInStatusState);

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
          <Button theme="primary" onClick={() => console.log('책추가!')}>
            책 추가하기
          </Button>
        </Modal>
      )}
    </FabWrapper>
  );
}
