import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { signOutApi } from '@apis/authApi';
import Edit from '@assets/ico_edit.svg';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';
import { IUser } from '@interfaces';
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

interface UserProfileProps {
  userProfile: IUser;
}

export default function UserProfile({ userProfile }: UserProfileProps) {
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
  }, [user]);

  return (
    <UserProfileWrapper>
      <UserThumbnail src={userProfile.profile_image} alt="User1" width={200} height={200} />
      <UserDetailGroup>
        <Username>{userProfile.nickname}</Username>
        <UserDescription>{userProfile.description}</UserDescription>

        <ButtonGroup isVisible={signInStatus.id !== 0 && signInStatus.id === userProfile.id}>
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
