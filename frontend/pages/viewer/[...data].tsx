import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/viewer/ClosedSideBar';
import TOC from '@components/viewer/TOC';
import useFetch from '@hooks/useFetch';
import { Flex } from '@styles/layout';

export default function Viewer() {
  const { data: article, execute: getArticle } = useFetch(getArticleApi);
  const { data: book, execute: getBook } = useFetch(getBookApi);

  const [isOpened, setIsOpened] = useState(true);

  const router = useRouter();

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (Array.isArray(router.query.data) && router.query.data?.length === 2) {
      const [bookId, articleId] = router.query.data;

      getBook(bookId);
      getArticle(articleId);
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
          <ArticleContainer article={article} scraps={book.scraps} bookId={book.id} />
        </Flex>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
