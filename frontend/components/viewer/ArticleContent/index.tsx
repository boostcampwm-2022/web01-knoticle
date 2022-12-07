import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import LeftBtnIcon from '@assets/ico_leftBtn.svg';
import Original from '@assets/ico_original.svg';
import RightBtnIcon from '@assets/ico_rightBtn.svg';
import Scrap from '@assets/ico_scrap.svg';
import signInStatusState from '@atoms/signInStatus';
import Content from '@components/common/Content';
import { IArticleBook, IScrap } from '@interfaces';
import { TextLarge } from '@styles/common';

import ArticleButton from './Button';
import {
  ArticleContainer,
  ArticleLeftBtn,
  ArticleMain,
  ArticleRightBtn,
  ArticleTitle,
  ArticleTitleBtnBox,
} from './styled';

interface ArticleProps {
  article: IArticleBook;
  scraps: IScrap[];
  bookId: number;
  bookAuthor: string;
  handleScrapBtnClick: () => void;
}

export default function Article({
  article,
  scraps,
  bookId,
  bookAuthor,
  handleScrapBtnClick,
}: ArticleProps) {
  const user = useRecoilValue(signInStatusState);

  const router = useRouter();

  const handleOriginalBtnOnClick = () => {
    router.push(`/viewer/${article.book_id}/${article.id}`);
  };

  const handleLeftBtnOnClick = () => {
    const prevOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order - 1;
    const prevArticleId = scraps.filter((scrap) => scrap.order === prevOrder)[0].article.id;
    router.push(`/viewer/${bookId}/${prevArticleId}`);
  };

  const handleRightBtnOnClick = () => {
    const nextOrder = scraps.filter((scrap) => scrap.article.id === article.id)[0].order + 1;
    const nextArticleId = scraps.filter((scrap) => scrap.order === nextOrder)[0].article.id;
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

  const handleScrapDeleteBtnOnClick = () => {
    if (window.confirm('해당 글을 책에서 삭제하시겠습니까?')) {
      //
    }
  };

  const handleModifyBtnOnClick = () => {
    router.push(`/editor?id=${article.id}`);
  };

  const checkArticleAuthority = (id: number) => {
    if (scraps.find((scrap) => scrap.article.id === id)) {
      return true;
    }
    // alert 두번뜨는 현상...
    // 404 페이지로 처리? 고민 중
    // alert('잘못된 접근입니다.');
    router.push('/');
    return false;
  };

  useEffect(() => {
    checkArticleAuthority(article.id);
  }, []);

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
            <TextLarge>{article.title}</TextLarge>
            <ArticleTitleBtnBox>
              {article.book_id !== bookId && (
                <ArticleButton onClick={handleOriginalBtnOnClick}>
                  <Image src={Original} alt="Original Icon" width={20} height={15} />
                  원본 글 보기
                </ArticleButton>
              )}
              {article.book_id === bookId && article.book.user.nickname === user.nickname && (
                <>
                  <ArticleButton onClick={handleDeleteBtnOnClick}>글 삭제</ArticleButton>
                  <ArticleButton onClick={handleModifyBtnOnClick}>글 수정</ArticleButton>
                </>
              )}
              {article.book_id !== bookId && bookAuthor === user.nickname && (
                <ArticleButton onClick={handleScrapDeleteBtnOnClick}>스크랩 삭제</ArticleButton>
              )}
              {user.id !== 0 && (
                <ArticleButton onClick={handleScrapBtnClick}>
                  <Image src={Scrap} alt="Scrap Icon" width={20} height={15} />
                  스크랩
                </ArticleButton>
              )}
            </ArticleTitleBtnBox>
          </ArticleTitle>
          <Content content={article.content} />
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
