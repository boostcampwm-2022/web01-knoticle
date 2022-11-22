import Image from 'next/image';

import Bookmark from '@assets/ico_bookmark.svg';
import Hide from '@assets/ico_hide.svg';
import SampleProflie from '@assets/ico_sampleProfile.svg';
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
  onClick: () => void;
}

export default function TOC({ book, onClick }: TocProps) {
  return (
    <TocWrapper>
      <TocSideBar>
        <TocIcons>
          <Image src={Bookmark} alt="Viewer Icon" />
          <Image src={Hide} alt="Viewer Icon" onClick={onClick} />
        </TocIcons>
        <TextSmall>{book._count.bookmarks}</TextSmall>
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
