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
  const highlightWord = (text: string, words: string[]): React.ReactNode => {
    let wordIndexList = words.map((word) => text.toLowerCase().indexOf(word.toLowerCase()));

    // eslint-disable-next-line no-param-reassign
    words = words.filter((_, index) => wordIndexList[index] !== -1);
    wordIndexList = wordIndexList.filter((index) => index !== -1);

    if (wordIndexList.length === 0) return text;

    const startIndex = Math.min(...wordIndexList);

    const targetWord = words[wordIndexList.indexOf(startIndex)];

    const endIndex = startIndex + targetWord.length;

    return (
      <>
        {text.slice(0, startIndex)}
        <b>{text.slice(startIndex, endIndex)}</b>
        {highlightWord(text.slice(endIndex), words)}
      </>
    );
  };

  return (
    <ItemWrapper>
      <ItemGroup>
        <ItemTitle>{highlightWord(title, keyword.trim().split(' '))}</ItemTitle>
        <ItemContent>{highlightWord(content, keyword.trim().split(' '))}</ItemContent>
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
