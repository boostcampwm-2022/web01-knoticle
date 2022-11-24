import Image from 'next/image';
import { useRouter } from 'next/router';

import axios from 'axios';

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

interface articleDataType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  deleted_at: string;
  book_id: number;
  book: any;
}

interface scrapsData {
  order: number;
  article: {
    id: number;
    title: string;
  };
}

interface articleProps {
  article: articleDataType;
  scraps: scrapsData[];
  bookId: number;
}

const user = {
  id: 1,
  nickname: 'mocha',
};

export default function Article({ article, scraps, bookId }: articleProps) {
  const router = useRouter();
  const handleOriginalBtnOnClick = () => {
    router.push(`/viewer/${article.book_id}/${article.id}`);
  };
  const handleLeftBtnOnClick = () => {
    const prevOrder = scraps.filter((v: scrapsData) => v.article.id === article.id)[0].order - 1;
    const prevArticleId = scraps.filter((v: scrapsData) => v.order === prevOrder)[0].article.id;
    router.push(`/viewer/${bookId}/${prevArticleId}`);
  };
  const handleRightBtnOnClick = () => {
    const nextOrder = scraps.filter((v: scrapsData) => v.article.id === article.id)[0].order + 1;
    const nextArticleId = scraps.filter((v: scrapsData) => v.order === nextOrder)[0].article.id;
    router.push(`/viewer/${bookId}/${nextArticleId}`);
  };
  const handleDeleteBtnOnClick = () => {
    if (window.confirm('해당 글을 삭제하시겠습니까?')) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/${article.id}`)
        .catch((err) => {
          // 추후 에러 핸들링 추가 예정
          console.log(err);
        });

      router.push('/');
    }
  };

  return (
    <ArticleContainer>
      {article.id === scraps.at(0)?.article.id ? null : (
        <ArticleLeftBtn onClick={handleLeftBtnOnClick}>
          <Image src={LeftBtnIcon} alt="Viewer Icon" />
        </ArticleLeftBtn>
      )}
      {!article.deleted_at ? (
        <ArticleMain>
          <ArticleTitle>
            {/* Global style Large의 크기가 너무 작음 -> 월요일 회의 후 반영 */}
            <TextLarge>{article.title}</TextLarge>
            <ArticleTitleBtnBox>
              {article.book.user.nickname === user.nickname ? (
                <ArticleButton onClick={handleDeleteBtnOnClick}>삭제</ArticleButton>
              ) : (
                <ArticleButton onClick={handleOriginalBtnOnClick}>
                  <Image src={Original} alt="Original Icon" width={20} height={15} />
                  원본 글 보기
                </ArticleButton>
              )}
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
          <ArticleContents>{article.content}</ArticleContents>
        </ArticleMain>
      ) : (
        <ArticleMain>삭제된 글입니다.</ArticleMain>
      )}
      {article.id === scraps.at(-1)?.article.id ? null : (
        <ArticleRightBtn onClick={handleRightBtnOnClick}>
          <Image src={RightBtnIcon} alt="Viewer Icon" />
        </ArticleRightBtn>
      )}
    </ArticleContainer>
  );
}
