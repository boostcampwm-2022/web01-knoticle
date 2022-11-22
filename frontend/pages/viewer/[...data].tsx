import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import axios from 'axios';

import GNB from '@components/common/GNB';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/Viewer/CloseedSideBar';
import TOC from '@components/viewer/TOC';
import { Flex } from '@styles/layout';

export default function Viewer() {
  const [book, setBook] = useState(null);
  const [isOpened, setIsOpened] = useState(true);

  const router = useRouter();

  const handleSideBar = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (book) return;
    if (router.query.data?.length === 2) {
      const [bookId, articleId] = router.query.data;

      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${bookId}`)
        .then((res) => setBook(res.data))
        .catch((err) => {
          // 추후 에러 핸들링 추가 예정
          console.log(err);
        });

      // articleId -> 글 조회 추가 예정
      console.log(articleId);
    }
  });

  // 우선 book데이터를 받아오면 렌더링하도록 구현 -> 추후 변경 예정
  return (
    <>
      <GNB />
      {book ? (
        <Flex>
          {isOpened ? (
            <TOC book={book} onClick={handleSideBar} />
          ) : (
            <ClosedSideBar onClick={handleSideBar} />
          )}
          <ArticleContainer />
        </Flex>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
