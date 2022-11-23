import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import axios from 'axios';

import GNB from '@components/common/GNB';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/viewer/ClosedSideBar';
import TOC from '@components/viewer/TOC';
import { Flex } from '@styles/layout';

export default function Viewer() {
  const [book, setBook] = useState<any>(null);
  const [article, setArticle] = useState<any>(null);
  const [idInfo, setIdInfo] = useState({
    bookId: '',
    articleId: '',
  });
  const [isOpened, setIsOpened] = useState(true);

  const router = useRouter();

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (Array.isArray(router.query.data) && router.query.data?.length === 2) {
      const [bookId, articleId] = router.query.data;
      if (bookId === idInfo.bookId && articleId === idInfo.articleId) return;
      setIdInfo({ ...idInfo, bookId, articleId });
    }
    // Eslint error 해결을 위해 dependency 추가
  }, [router.query.data, idInfo]);

  useEffect(() => {
    if (idInfo.bookId === '') return;
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${idInfo.bookId}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        // 추후 에러 핸들링 추가 예정
        console.log(err);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/${idInfo.articleId}`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        // 추후 에러 핸들링 추가 예정
        console.log(err);
      });
  }, [idInfo]);

  return (
    <>
      <GNB />
      {book && article ? (
        <Flex>
          {isOpened ? (
            <TOC book={book} handleSideBarOnClick={handleSideBarToggle} />
          ) : (
            <ClosedSideBar handleSideBarOnClick={handleSideBarToggle} />
          )}
          <ArticleContainer article={article} scraps={book.scraps} bookId={book.id} />
        </Flex>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
