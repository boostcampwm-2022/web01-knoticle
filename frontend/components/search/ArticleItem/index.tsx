import Image from 'next/image';

import TemporaryImage from '@assets/img_profile.png';
import { TextSmall, TextXSmall } from '@styles/common';

import {
  ItemContent,
  ItemGroup,
  ItemTitle,
  ItemWrapper,
  ProfileDescription,
  ProfileImage,
  UserProfile,
} from './styled';

interface ArticleItemProps {
  title: string;
  content: string;
  nickname: string;
}

export default function ArticleItem({ title, content, nickname }: ArticleItemProps) {
  return (
    <ItemWrapper>
      <ItemGroup>
        <ItemTitle>{title}</ItemTitle>
        <ItemContent>{content}</ItemContent>
      </ItemGroup>
      <UserProfile>
        <ProfileDescription>
          <TextXSmall>Written By</TextXSmall>
          <TextSmall>{nickname}</TextSmall>
        </ProfileDescription>
        <ProfileImage>
          <Image src={TemporaryImage} alt="profile" width={72} height={72} />
        </ProfileImage>
      </UserProfile>
    </ItemWrapper>
  );
}
