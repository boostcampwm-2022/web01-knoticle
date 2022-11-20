import Image from 'next/image';

import Edit from '../../../assets/ico_edit.svg';
import User1 from '../../../assets/ico_user1.svg';
import { TextLinkMedium } from '../../../styles/common';
import {
  ProfileEditButton,
  Userdesciprtion,
  USerDetialGroup,
  Username,
  UserProfileWrapper,
  UserThumbnail,
} from './styeld';

export default function UserProfile() {
  return (
    <UserProfileWrapper>
      <UserThumbnail src={User1} alt="User1" />
      <USerDetialGroup>
        <Username>Web01</Username>
        <Userdesciprtion>안녕하세요 Web01입니다.</Userdesciprtion>
        <ProfileEditButton type="button">
          <TextLinkMedium>프로필 수정</TextLinkMedium>
          <Image src={Edit} alt="profile_edit" />
        </ProfileEditButton>
      </USerDetialGroup>
    </UserProfileWrapper>
  );
}
