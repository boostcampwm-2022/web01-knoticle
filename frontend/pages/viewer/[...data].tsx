import { useRouter } from 'next/router';

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
import useFetch from '@hooks/useFetch';
import { Flex } from '@styles/layout';
import { useRecoilValue } from 'recoil';

export default function Viewer() {
  const { data: article, execute: getArticle } = useFetch(getArticleApi);
  const { data: book, execute: getBook } = useFetch(getBookApi);
  const { data: userBooks, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);

  const user = useRecoilValue(signInStatusState);

  const [isOpened, setIsOpened] = useState(true);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const router = useRouter();

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (Array.isArray(router.query.data) && router.query.data?.length === 2) {
      const [bookId, articleId] = router.query.data;

      getBook(bookId);
      getArticle(articleId);
      getUserKnottedBooks(user.nickname);
    }
  }, [router.query.data]);

  return (
    <>
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
