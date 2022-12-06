import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi, getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import Modal from '@components/common/Modal';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/viewer/ClosedSideBar';
import ScrapModal from '@components/viewer/ScrapModal';
import TOC from '@components/viewer/TOC';
import ViewerHead from '@components/viewer/ViewerHead';
import useFetch from '@hooks/useFetch';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';
import { useRecoilValue } from 'recoil';

interface ViewerProps {
  book: IBookScraps;
  article: IArticleBook;
}

export default function Viewer({ book, article }: ViewerProps) {
  const { data: userBooks, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);

  const user = useRecoilValue(signInStatusState);

  const [isOpened, setIsOpened] = useState(true);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    getUserKnottedBooks(user.nickname);
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
          <ArticleContainer
            article={article}
            scraps={book.scraps}
            bookId={book.id}
            bookAuthor={book.user.nickname}
            handleScrapBtnClick={handleModalOpen}
          />
        </Flex>
      ) : (
        <div>loading</div>
      )}
      {isModalShown && (
        <Modal title="글 스크랩하기" handleModalClose={handleModalClose}>
          <ScrapModal books={userBooks} handleModalClose={handleModalClose} article={article} />
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
