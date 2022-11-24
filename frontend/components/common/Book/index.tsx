import Image from 'next/image';

import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_grey_filled.svg';
import MoreContentsIcon from '@assets/ico_more_contents.svg';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import useBookmark from '@hooks/useBookmark';
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

interface Bookmark {
  id: number | null;
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
    bookmarks: Bookmark[];
  };
}

export default function Book({ book }: BookProps) {
  const { id, title, user, scraps, _count, bookmark } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(
    book.bookmarks[0].id,
    book._count.bookmarks,
    book.id
  );

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
              src={curBookmarkId ? ActiveBookmarkIcon : InactiveBookmarkIcon}
              alt="Bookmark Icon"
              onClick={handleBookmarkClick}
            />
            <TextXSmall>{curBookmarkCnt}</TextXSmall>
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
