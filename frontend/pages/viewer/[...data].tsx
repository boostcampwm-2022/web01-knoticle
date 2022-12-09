import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import Modal from '@components/common/Modal';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/viewer/ClosedSideBar';
import ScrapModal from '@components/viewer/ScrapModal';
import TOC from '@components/viewer/TOC';
import ViewerHead from '@components/viewer/ViewerHead';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

interface ViewerProps {
  book: IBookScraps;
  article: IArticleBook;
}

export default function Viewer({ book, article }: ViewerProps) {
  const router = useRouter();

  const [isOpened, setIsOpened] = useState(false);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  const checkArticleAuthority = (id: number) => {
    if (book.scraps.find((scrap) => scrap.article.id === id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!checkArticleAuthority(article.id)) router.push('/404');
  });
  useEffect(() => {
    if (window.innerWidth > 576) setIsOpened(true);
  }, []);

  return (
    <>
      <ViewerHead articleTitle={article.title} articleContent={article.content} />
      <GNB />
      {book && article ? (
        <Flex>
          {isOpened ? (
            <TOC book={book} articleId={article.id} handleSideBarOnClick={handleSideBarToggle} />
          ) : (
            <ClosedSideBar handleSideBarOnClick={handleSideBarToggle} />
          )}
          {book.scraps.find((scrap) => scrap.article.id === article.id) ? (
            <ArticleContainer
              article={article}
              scraps={book.scraps}
              bookId={book.id}
              bookAuthor={book.user.nickname}
              handleScrapBtnClick={handleModalOpen}
            />
          ) : (
            <div>올바르지 않은 접근입니다.</div>
          )}
        </Flex>
      ) : (
        <div>loading</div>
      )}
      {isModalShown && (
        <Modal title="글 스크랩하기" handleModalClose={handleModalClose}>
          <ScrapModal bookId={book.id} handleModalClose={handleModalClose} article={article} />
        </Modal>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [bookId, articleId] = context.query.data as string[];
  const book = await getBookApi(bookId);
  const article = await getArticleApi(articleId);

  return { props: { book, article } };
};
