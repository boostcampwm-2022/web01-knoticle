import Image from 'next/image';
import Link from 'next/link';

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
  title: React.ReactNode;
  content: React.ReactNode;
  nickname: string;
  profileImage: string;
  articleUrl: string;
  studyUrl: string;
}

export default function ArticleItem({
  title,
  content,
  nickname,
  profileImage,
  articleUrl,
  studyUrl,
}: ArticleItemProps) {
  return (
    <ItemWrapper>
      <ItemGroup>
        <Link href={articleUrl}>
          <ItemTitle>{title}</ItemTitle>
          <ItemContent>{content}</ItemContent>
        </Link>
      </ItemGroup>
      <Link href={studyUrl}>
        <UserProfile>
          <ProfileDescription>
            <TextXSmall>Written By</TextXSmall>
            <TextSmall>{nickname}</TextSmall>
          </ProfileDescription>
          <ProfileImage src={profileImage} alt="profile" width={72} height={72} />
        </UserProfile>
      </Link>
    </ItemWrapper>
  );
}
