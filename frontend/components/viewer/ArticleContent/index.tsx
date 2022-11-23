import Image from 'next/image';

import LeftBtnIcon from '@assets/ico_leftBtn.svg';
import Original from '@assets/ico_original.svg';
import RightBtnIcon from '@assets/ico_rightBtn.svg';
import Scrap from '@assets/ico_scrap.svg';
import { TextLarge } from '@styles/common';

import ArticleButton from './Button';
import {
  ArticleContainer,
  ArticleLeftBtn,
  ArticleMain,
  ArticleContents,
  ArticleRightBtn,
  ArticleTitle,
  ArticleTitleBtnBox,
} from './styled';

interface articleProps {
  article: any;
}

export default function Article({ article }: articleProps) {
  return (
    <ArticleContainer>
      <ArticleLeftBtn>
        <Image src={LeftBtnIcon} alt="Viewer Icon" />
      </ArticleLeftBtn>
      <ArticleMain>
        <ArticleTitle>
          {/* Global style Large의 크기가 너무 작음 -> 월요일 회의 후 반영 */}
          <TextLarge>{article.title}</TextLarge>
          <ArticleTitleBtnBox>
            <ArticleButton
              onClick={() => {
                console.log('click');
              }}
            >
              <Image src={Original} alt="Original Icon" width={20} height={15} />
              원본 글 보기
            </ArticleButton>
            <ArticleButton
              onClick={() => {
                console.log('click');
              }}
            >
              <Image src={Scrap} alt="Scrap Icon" width={20} height={15} />
              스크랩
            </ArticleButton>
          </ArticleTitleBtnBox>
        </ArticleTitle>
        <ArticleContents>{article.contents}</ArticleContents>
      </ArticleMain>
      <ArticleRightBtn>
        <Image src={RightBtnIcon} alt="Viewer Icon" />
      </ArticleRightBtn>
    </ArticleContainer>
  );
}
