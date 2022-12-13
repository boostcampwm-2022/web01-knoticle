import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleContainer from '@components/viewer/ArticleContent';
import TOC from '@components/viewer/TOC';
import ViewerHead from '@components/viewer/ViewerHead';
import useFetch from '@hooks/useFetch';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex, PageGNBHide, PageNoScrollWrapper } from '@styles/layout';
import { parseHeadings } from '@utils/toc';

interface ViewerProps {
  article: IArticleBook;
}

export default function Viewer({ article }: ViewerProps) {
  const Modal = dynamic(() => import('@components/common/Modal'));
  const ScrapModal = dynamic(() => import('@components/viewer/ScrapModal'));

  const router = useRouter();

  const { data: book, execute: getBook } = useFetch<IBookScraps>(getBookApi);

  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const handleSideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
  };

  const checkArticleAuthority = (targetBook: IBookScraps, id: number) => {
    if (!targetBook) return false;
    if (targetBook.scraps.find((scrap) => scrap.article.id === id)) return true;
    return false;
  };

  const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    if (window.innerWidth > 576) setSideBarOpen(true);

    syncHeight();

    window.addEventListener('resize', syncHeight);

    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  useEffect(() => {
    if (Array.isArray(router.query.data) && router.query.data?.length === 2) {
      const bookId = router.query.data[0];
      getBook(bookId);
    }
  }, [router.query.data]);

  useEffect(() => {
    if (book === undefined) return;
    if (!checkArticleAuthority(book, article.id)) router.push('/404');
  }, [book]);

  const [isScrollDown, setIsScrollDown] = useState<'true' | 'false'>('false');

  return (
    <PageNoScrollWrapper>
      {article && <ViewerHead articleTitle={article.title} articleContent={article.content} />}
      <PageGNBHide isscrolldown={isScrollDown}>
        <GNB />
      </PageGNBHide>
      {book && article && (
        <Flex>
          <TOC
            book={book}
            articleId={article.id}
            articleToc={parseHeadings(article.content)}
            isOpen={isSideBarOpen}
            handleSideBarToggle={handleSideBarToggle}
            isscrolldown={isScrollDown}
          />

          {book.scraps.find((scrap) => scrap.article.id === article.id) && (
            <ArticleContainer
              article={article}
              scraps={book.scraps}
              bookId={book.id}
              bookAuthor={book.user.nickname}
              articleData={article.content}
              handleScrapBtnClick={handleModalOpen}
              setIsScrollDown={setIsScrollDown}
            />
          )}
        </Flex>
      )}
      {isModalShown && book && (
        <Modal title="글 스크랩하기" handleModalClose={handleModalClose}>
          <ScrapModal bookId={book.id} handleModalClose={handleModalClose} article={article} />
        </Modal>
      )}
    </PageNoScrollWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [, articleId] = context.query.data as string[];
  const article = await getArticleApi(articleId);

  return { props: { article } };
};
