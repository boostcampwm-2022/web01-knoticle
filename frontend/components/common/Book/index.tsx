import Image from 'next/image';
import Link from 'next/link';

import BookmarkIcon from '@assets/ico_bookmark.svg';
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
} from './styled';

interface BookProps {
  book: {
    id: number;
    title: string;
    user: {
      nickname: string;
      profile_image: string;
    };
    scraps: {
      order: number;
      article: {
        id: number;
        title: string;
      };
    }[];
    _count: {
      bookmarks: number;
    };
  };
}

export default function Book({ book }: BookProps) {
  const { id, title, user, scraps, _count } = book;

  return (
    <BookWrapper>
      <Image src={SampleThumbnail} alt="thumbnail" width={280} height={200} />
      <BookInfoContainer>
        <FlexSpaceBetween>
          <BookTitle>
            <TextLarge>{title}</TextLarge>
            <TextXSmall>by {user.nickname}</TextXSmall>
          </BookTitle>
          <Bookmark>
            <Image src={BookmarkIcon} alt="Bookmark Icon" />
            <TextXSmall>{_count.bookmarks}</TextXSmall>
          </Bookmark>
        </FlexSpaceBetween>
        <BookContentsInfo>
          <TextSmall>Contents</TextSmall>
          <BookContents>
            {scraps.map((scrap, idx) => (
              <Link key={scrap.article.id} href={`/viewer/${id}/${scrap.article.id}`}>
                {idx}. {scrap.article.title}
              </Link>
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
