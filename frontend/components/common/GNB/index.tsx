import Link from 'next/link';

import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import ArticleIcon from '@assets/ico_article.svg';
import PersonIcon from '@assets/ico_person.svg';
import SearchIcon from '@assets/ico_search.svg';
import signInStatusState from '@atoms/singInStatus';
import Modal from '@components/common/Modal';
import SignInModal from '@components/SignInModal';
import SignUpModal from '@components/SignUpModal';

import { GNBbar, Icon, IconsContainer, Logo } from './styled';

export default function GNB() {
  const [isModalShown, setModalShown] = useState(false);
  const [currentModalState, setCurrentModalState] = useState<'SignIn' | 'SignUp'>('SignIn');
  const signInStatus = useRecoilValue(signInStatusState);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => {
    setModalShown(false);
    setCurrentModalState('SignIn');
  };
  const handleGoToSignUpBtnClicked = () => setCurrentModalState('SignUp');
  const handleBackwardBtnClicked = () => setCurrentModalState('SignIn');

  return (
    <GNBbar>
      <IconsContainer />
      <Logo href="/">knoticle</Logo>
      <IconsContainer>
        <Link href="/editor">
          <Icon
            src={ArticleIcon}
            alt="Article Icon"
            isvisible={(signInStatus.id !== 0).toString()}
          />
        </Link>

        {signInStatus.id !== 0 ? (
          <Link href={`/study/${signInStatus.id}`}>
            <Icon src={PersonIcon} alt="Person Icon" />
          </Link>
        ) : (
          <Icon src={PersonIcon} alt="Person Icon" onClick={handleModalOpen} />
        )}

        <Link href="/search">
          <Icon src={SearchIcon} alt="Search Icon" />
        </Link>
      </IconsContainer>

      {isModalShown &&
        ((currentModalState === 'SignUp' && (
          <Modal
            title="Knoticle 함께하기"
            handleModalClose={handleModalClose}
            handleBackwardBtnClicked={handleBackwardBtnClicked}
            hasBackward
          >
            <SignUpModal handleModalClose={handleModalClose} />
          </Modal>
        )) || (
          <Modal title="Knoticle 시작하기" handleModalClose={handleModalClose}>
            <SignInModal
              handleGoToSignUpBtnClicked={handleGoToSignUpBtnClicked}
              handleModalClose={handleModalClose}
            />
          </Modal>
        ))}
    </GNBbar>
  );
}
