import Image from 'next/image';

import InactiveBookmarkIcon from '@assets/ico_bookmark_black.svg';
import ActiveBookmarkIcon from '@assets/ico_bookmark_grey_filled.svg';
import MoreContentsIcon from '@assets/ico_more_contents.svg';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
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

interface BookProps {
  book: IBookScraps;
  handleEditBookModalOpen?: () => void;
}

export default function Book({ book, handleEditBookModalOpen }: BookProps) {
  const { id, title, user, scraps, _count, bookmarks } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(
    bookmarks.length ? bookmarks[0].id : null,
    _count.bookmarks,
    id
  );

  return (
    // 수정모드일때만 아래 onclick이 실행되도록 수정해야함 -> 민형님 작업 후
    <BookWrapper onClick={handleEditBookModalOpen}>
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
            {scraps.map(
              (scrap, idx) =>
                idx < 4 && (
                  <ArticleLink key={scrap.article.id} href={`/viewer/${id}/${scrap.article.id}`}>
                    <span>
                      {idx + 1}. {scrap.article.title}
                    </span>
                  </ArticleLink>
                )
            )}
          </BookContents>
        </BookContentsInfo>
        {scraps.length > 4 && (
          <FlexCenter>
            <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
          </FlexCenter>
        )}
      </BookInfoContainer>
    </BookWrapper>
  );
}
Book.defaultProps = {
  handleEditBookModalOpen: null,
};
