import Image from 'next/image';

import { useState } from 'react';

import ArticleIcon from '@assets/ico_article.svg';
import PersonIcon from '@assets/ico_person.svg';
import SearchIcon from '@assets/ico_search.svg';
import Modal from '@components/common/Modal';
import SignInModal from '@components/SignInModal';

import { GNBbar, IconsContainer, Logo } from './styled';

export default function GNB() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  return (
    <GNBbar>
      <IconsContainer />
      <Logo>knoticle</Logo>
      <IconsContainer>
        <Image src={ArticleIcon} alt="Article Icon" />
        <Image src={PersonIcon} alt="Person Icon" onClick={handleModalOpen} />
        <Image src={SearchIcon} alt="Search Icon" />
      </IconsContainer>

      {isModalShown && (
        <Modal title="Knoticle 시작하기" handleModalClose={handleModalClose}>
          <SignInModal />
        </Modal>
      )}
    </GNBbar>
  );
}
