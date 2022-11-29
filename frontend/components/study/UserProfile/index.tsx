import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { signOutApi } from '@apis/authApi';
import Edit from '@assets/ico_edit.svg';
import User1 from '@assets/ico_user1.svg';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';
import { TextLinkMedium } from '@styles/common';

import {
  ButtonGroup,
  LogoutButton,
  ProfileEditButton,
  UserDescription,
  UserDetailGroup,
  Username,
  UserProfileWrapper,
  UserThumbnail,
} from './styled';

export default function UserProfile() {
  const router = useRouter();

  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);
  const { data: user, execute: signOut } = useFetch(signOutApi);

  const handleLogoutBtnClick = () => {
    signOut();
  };

  useEffect(() => {
    if (!user) return;

    setSignInStatus({
      ...user,
    });
    router.push('/');
  }, user);

  return (
    <UserProfileWrapper>
      <UserThumbnail src={User1} alt="User1" />
      <UserDetailGroup>
        <Username>Web01</Username>
        <UserDescription>안녕하세요 Web01입니다.</UserDescription>

        <ButtonGroup isVisible={signInStatus.id !== 0}>
          <ProfileEditButton type="button">
            <TextLinkMedium>프로필 수정</TextLinkMedium>
            <Image src={Edit} alt="profile_edit" />
          </ProfileEditButton>

          <LogoutButton onClick={handleLogoutBtnClick}>
            <TextLinkMedium>로그아웃</TextLinkMedium>
          </LogoutButton>
        </ButtonGroup>
      </UserDetailGroup>
    </UserProfileWrapper>
  );
}
