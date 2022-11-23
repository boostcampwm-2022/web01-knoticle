import Image from 'next/image';

import { useState } from 'react';

import axios from 'axios';

import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_red.svg';
import MoreContentsIcon from '@assets/ico_more_contents.svg';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import { TextLarge, TextXSmall, TextSmall } from '@styles/common';
import { FlexCenter, FlexSpaceBetween } from '@styles/layout';

import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  Bookmark,
  BookContentsInfo,
  BookContents,
  BookThumbnail,
  ArticleLink,
  AuthorLink,
  BookmarkIcon,
} from './styled';

interface User {
  id: number;
  nickname: string;
  profile_image: string;
}

interface Scrap {
  order: number;
  article: {
    id: number;
    title: string;
  };
}

interface BookProps {
  book: {
    id: number;
    title: string;
    user: User;
    scraps: Scrap[];
    _count: {
      bookmarks: number;
    };
    isBookmarked: boolean;
  };
}

export default function Book({ book }: BookProps) {
  const { id, title, user, scraps, _count, isBookmarked } = book;
  const [isBookmarkedNow, setIsBookmarkedNow] = useState<boolean>(isBookmarked);
  const handleBookmarkClick = async () => {
    if (isBookmarkedNow) {
      // 북마크 삭제 API 요청
      // await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_UR}/api/bookmarks/${id}`);
    } else {
      // 북마크 생성 API 요청
      // await axios.post(`${process.env.NEXT_PUBLIC_SERVER_UR}/api/bookmarks`, {
      //   book_id: id,
      // });
    }
    setIsBookmarkedNow(!isBookmarkedNow);
  };

  return (
    <BookWrapper>
      <BookThumbnail src={SampleThumbnail} alt="thumbnail" />

      <BookInfoContainer>
        <FlexSpaceBetween>
          <BookTitle>
            <TextLarge>{title}</TextLarge>
            <AuthorLink href={`/study/${user.nickname}`}>by {user.nickname}</AuthorLink>
          </BookTitle>
          <Bookmark>
            <BookmarkIcon
              src={isBookmarkedNow ? ActiveBookmarkIcon : InactiveBookmarkIcon}
              alt="Bookmark Icon"
              onClick={handleBookmarkClick}
            />
            <TextXSmall>{_count.bookmarks + (isBookmarkedNow ? 1 : 0)}</TextXSmall>
          </Bookmark>
        </FlexSpaceBetween>

        <BookContentsInfo>
          <TextSmall>Contents</TextSmall>
          <BookContents>
            {scraps.map((scrap, idx) => (
              <ArticleLink key={scrap.article.id} href={`/viewer/${id}/${scrap.article.id}`}>
                {idx}. {scrap.article.title}
              </ArticleLink>
            ))}
          </BookContents>
          <FlexCenter>
            <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
          </FlexCenter>
        </BookContentsInfo>
      </BookInfoContainer>
    </BookWrapper>
  );
}
