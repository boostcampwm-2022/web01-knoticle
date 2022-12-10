import Image from 'next/image';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import Hide from '@assets/ico_hide.svg';
import Open from '@assets/ico_open.svg';
import SampleProflie from '@assets/ico_sampleProfile.svg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextMedium, TextSmall } from '@styles/common';

import {
  TocWrapper,
  TocSideBar,
  TocIcons,
  TocTitle,
  TocContainer,
  TocList,
  TocProfile,
  TocProfileText,
  TocImgWrapper,
  TocArticle,
  TocOpenButton,
} from './styled';

interface TocProps {
  articleId: number;
  book: IBookScraps;
  isOpen: boolean;
  handleSideBarToggle: () => void;
  isscrolldown: 'true' | 'false';
}

export default function TOC({
  articleId,
  book,
  isOpen,
  handleSideBarToggle,
  isscrolldown,
}: TocProps) {
  const { id, title, user, scraps, _count, bookmarks } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(
    bookmarks.length ? bookmarks[0].id : null,
    _count.bookmarks,
    id
  );

  return (
    <>
      <TocWrapper isOpen={isOpen}>
        <TocSideBar>
          <TocIcons>
            <Image
              src={curBookmarkId ? BookmarkFilled : Bookmark}
              alt="Filled Bookmark Icon"
              onClick={handleBookmarkClick}
            />

            <Image src={Hide} alt="Closed Sidebar Icon" onClick={handleSideBarToggle} />
          </TocIcons>
          <TextSmall>{curBookmarkCnt}</TextSmall>
          <TocTitle>{title}</TocTitle>

          <TocContainer>
            <TextMedium>목차</TextMedium>
            <TocList>
              {scraps.map((v) => {
                return (
                  <TocArticle
                    href={`/viewer/${id}/${v.article.id}`}
                    key={v.order}
                    className={v.article.id === articleId ? 'current' : ''}
                  >
                    {v.order}.{v.article.title}
                  </TocArticle>
                );
              })}
            </TocList>
          </TocContainer>
        </TocSideBar>
        <TocProfile href={`/study/${user.nickname}`}>
          <TocProfileText>
            <TextSmall>Written by</TextSmall>
            <TextMedium>{user.nickname}</TextMedium>
          </TocProfileText>
          <TocImgWrapper src={SampleProflie} alt="Viewer Icon" />
        </TocProfile>
      </TocWrapper>

      {!isOpen && (
        <TocOpenButton onClick={handleSideBarToggle} isscrolldown={isscrolldown}>
          <Image src={Open} alt="Open Sidebar Icon" />
        </TocOpenButton>
      )}
    </>
  );
}
