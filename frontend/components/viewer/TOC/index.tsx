import Image from 'next/image';

import { useState } from 'react';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import Hide from '@assets/ico_hide.svg';
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
  TocArticleTitle,
  TocCurrentArticle,
} from './styled';

interface TocProps {
  // book 객체에 대한 interface 추가 예정
  articleId: number;
  articleToc: {
    title: string;
    count: number | undefined;
  }[];
  book: IBookScraps;
  handleSideBarOnClick: () => void;
}

export default function TOC({ articleId, articleToc, book, handleSideBarOnClick }: TocProps) {
  const { id, title, user, scraps, _count, bookmarks } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(
    bookmarks.length ? bookmarks[0].id : null,
    _count.bookmarks,
    id
  );
  const [isArticleShown, setIsArticleShown] = useState(true);

  const handleCurrentArticle = () => {
    setIsArticleShown((prev) => !prev);
  };

  return (
    <TocWrapper>
      <TocSideBar>
        <TocIcons>
          <Image
            src={curBookmarkId ? BookmarkFilled : Bookmark}
            alt="Filled Bookmark Icon"
            onClick={handleBookmarkClick}
          />

          <Image src={Hide} alt="Closed Sidebar Icon" onClick={handleSideBarOnClick} />
        </TocIcons>
        <TextSmall>{curBookmarkCnt}</TextSmall>
        <TocTitle>{title}</TocTitle>

        <TocContainer>
          <TextMedium>목차</TextMedium>
          <TocList>
            {scraps.map((v) => {
              return v.article.id !== articleId ? (
                <TocArticle href={`/viewer/${id}/${v.article.id}`} key={v.order}>
                  {v.order}.{v.article.title}
                </TocArticle>
              ) : (
                <TocCurrentArticle key={v.order} className="current">
                  <TextSmall onClick={handleCurrentArticle} style={{ cursor: 'pointer' }}>
                    {v.order}.{v.article.title}
                  </TextSmall>
                  {isArticleShown &&
                    articleToc.map((article) => (
                      <TocArticleTitle
                        href={`#${article.title}`}
                        key={article.title}
                        count={article.count}
                      >
                        {article.title}
                      </TocArticleTitle>
                    ))}
                </TocCurrentArticle>
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
  );
}
