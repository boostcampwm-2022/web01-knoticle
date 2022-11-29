import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import Edit from '@assets/ico_edit.svg';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import { IUser } from '@interfaces';
import { TextLinkMedium } from '@styles/common';

import {
  ButtonGroup,
  EditUsername,
  ProfileEditButton,
  EditUserDescription,
  UserDetailGroup,
  UserProfileWrapper,
  UserThumbnail,
} from './styled';

interface EditUserProfileProps {
  userProfile: IUser;
  curUserProfile: IUser;
  handleEditFinishBtnClick: () => void;
  setCurUserProfile: (userProfile: IUser) => void;
}

export default function EditUserProfile({
  userProfile,
  curUserProfile,
  handleEditFinishBtnClick,
  setCurUserProfile,
}: EditUserProfileProps) {
  const router = useRouter();
  const { value: nicknameValue, onChange: onNicknameChange } = useInput(userProfile.nickname);
  const { value: descriptionValue, onChange: onDescriptionChange } = useInput(
    userProfile.description
  );

  useEffect(() => {
    setCurUserProfile({
      ...curUserProfile,
      nickname: nicknameValue,
      description: descriptionValue,
    });
  }, [nicknameValue, descriptionValue]);

  return (
    <UserProfileWrapper>
      <UserThumbnail src={userProfile.profile_image} alt="User1" width={200} height={200} />
      <UserDetailGroup>
        <EditUsername
          defaultValue={userProfile.nickname}
          value={nicknameValue}
          onChange={onNicknameChange}
        />
        <EditUserDescription
          defaultValue={userProfile.description}
          value={descriptionValue}
          onChange={onDescriptionChange}
        />

        <ButtonGroup isVisible>
          <ProfileEditButton type="button" onClick={handleEditFinishBtnClick}>
            <TextLinkMedium>수정 완료</TextLinkMedium>
            <Image src={Edit} alt="profile_edit" />
          </ProfileEditButton>
        </ButtonGroup>
      </UserDetailGroup>
    </UserProfileWrapper>
  );
}
