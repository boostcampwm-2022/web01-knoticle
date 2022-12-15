import Image from 'next/image';

import { useState } from 'react';

import Bookmark from '@assets/ico_bookmark.svg';
import BookmarkFilled from '@assets/ico_bookmark_white_filled.svg';
import Hide from '@assets/ico_hide.svg';
import Open from '@assets/ico_open.svg';
import useBookmark from '@hooks/useBookmark';
import { IBookScraps } from '@interfaces';
import { TextMedium, TextSmall } from '@styles/common';
import { FlexCenter, FlexSpaceBetween } from '@styles/layout';

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
  TocOpenButton,
  TocCurrentText,
} from './styled';

interface TocProps {
  articleId: number;
  articleToc: {
    heading: string;
    link: string;
    padding: number;
  }[];
  book: IBookScraps;
  isOpen: boolean;
  handleSideBarToggle: () => void;
  isscrolldown: 'true' | 'false';
}

export default function TOC({
  articleId,
  articleToc,
  book,
  isOpen,
  handleSideBarToggle,
  isscrolldown,
}: TocProps) {
  const { id, title, user, scraps } = book;
  const { handleBookmarkClick, curBookmarkCnt, curBookmarkId } = useBookmark(book);

  const [isArticleShown, setIsArticleShown] = useState(true);

  const handleCurrentArticle = () => {
    setIsArticleShown((prev) => !prev);
  };

  return (
    <>
      <TocWrapper isOpen={isOpen}>
        <TocSideBar>
          <FlexSpaceBetween>
            <FlexCenter style={{ gap: 8 }}>
              <TocIcons>
                <Image
                  src={curBookmarkId ? BookmarkFilled : Bookmark}
                  alt="Filled Bookmark Icon"
                  onClick={handleBookmarkClick}
                />
              </TocIcons>
              <TextSmall>{curBookmarkCnt}</TextSmall>
            </FlexCenter>
            <Image src={Hide} alt="Closed Sidebar Icon" onClick={handleSideBarToggle} />
          </FlexSpaceBetween>

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
                    <TocCurrentText onClick={handleCurrentArticle}>
                      {v.order}.{v.article.title}
                    </TocCurrentText>
                    {isArticleShown &&
                      articleToc.map((article) => (
                        <TocArticleTitle
                          href={article.link}
                          key={article.link}
                          padding={article.padding}
                        >
                          {article.heading}
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
            <TextSmall>Knotted by</TextSmall>
            <TextMedium>{user.nickname}</TextMedium>
          </TocProfileText>
          <TocImgWrapper src={user.profile_image} width={70} height={70} alt="Viewer Icon" />
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
