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
  keyword: string;
  title: string;
  content: string;
  nickname: string;
}

export default function ArticleItem({ keyword, title, content, nickname }: ArticleItemProps) {
  const highlightWord = (text: string, word: string): React.ReactNode => {
    const startIndex = text.toLowerCase().indexOf(word.toLowerCase());

    if (startIndex === -1) return text;

    const endIndex = startIndex + word.length;

    return (
      <>
        {text.slice(0, startIndex)}
        <b style={{ fontWeight: 700 }}>{text.slice(startIndex, endIndex)}</b>
        {highlightWord(text.slice(endIndex), word)}
      </>
    );
  };

  return (
    <ItemWrapper>
      <ItemGroup>
        <ItemTitle>{highlightWord(title, keyword)}</ItemTitle>
        <ItemContent>{highlightWord(content, keyword)}</ItemContent>
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
