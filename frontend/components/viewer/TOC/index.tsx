import Image from 'next/image';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import Hide from '@assets/ico_hide.svg';
import SampleProflie from '@assets/ico_sampleProfile.svg';
import useBookmark from '@hooks/useBookmark';
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
} from './styled';

interface TocProps {
  // book 객체에 대한 interface 추가 예정
  book: any;
  handleSideBarOnClick: () => void;
}

export default function TOC({ book, handleSideBarOnClick }: TocProps) {
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(
    null,
    book._count.bookmarks,
    book.id
  );

  return (
    <TocWrapper>
      <TocSideBar>
        <TocIcons>
          {curBookmarkId ? (
            <Image src={BookmarkFilled} alt="Filled Bookmark Icon" onClick={handleBookmarkClick} />
          ) : (
            <Image src={Bookmark} alt="Bookmark Icon" onClick={handleBookmarkClick} />
          )}
          <Image src={Hide} alt="Closed Sidebar Icon" onClick={handleSideBarOnClick} />
        </TocIcons>
        <TextSmall>{curBookmarkCnt}</TextSmall>
        <TocTitle>{book.title}</TocTitle>

        <TocContainer>
          <TextMedium>목차</TextMedium>
          <TocList>
            {book.scraps.map((v) => {
              return (
                <TocArticle href={`/viewer/${book.id}/${v.article.id}`} key={v.order}>
                  {v.order}.{v.article.title}
                </TocArticle>
              );
            })}
          </TocList>
        </TocContainer>
      </TocSideBar>
      <TocProfile>
        <TocProfileText>
          <TextSmall>Written by</TextSmall>
          <TextMedium>{book.user.nickname}</TextMedium>
        </TocProfileText>
        <TocImgWrapper src={SampleProflie} alt="Viewer Icon" />
      </TocProfile>
    </TocWrapper>
  );
}
