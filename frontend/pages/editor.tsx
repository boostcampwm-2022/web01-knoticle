import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getArticleApi } from '@apis/articleApi';
import { getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import EditHead from '@components/edit/EditHead';
import Editor from '@components/edit/Editor';
import useFetch from '@hooks/useFetch';
import { IArticle } from '@interfaces';
import { PageNoScrollWrapper } from '@styles/layout';
import { toastError } from '@utils/toast';

export default function EditorPage() {
  const Modal = dynamic(() => import('@components/common/Modal'));
  const PublishModal = dynamic(() => import('@components/edit/PublishModal'));
  const ModifyModal = dynamic(() => import('@components/edit/ModifyModal'));

  const router = useRouter();

  const [isModalShown, setModalShown] = useState(false);
  const [originalArticle, setOriginalArticle] = useState<IArticle | undefined>(undefined);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const { data: books, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);
  const { data: article, execute: getArticle } = useFetch(getArticleApi);

  const user = useRecoilValue(signInStatusState);

  const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    syncHeight();

    window.addEventListener('resize', syncHeight);

    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  useEffect(() => {
    getUserKnottedBooks(user.nickname);
  }, [user.nickname]);

  useEffect(() => {
    if (router.query.id) getArticle(router.query.id);
  }, [router.query]);

  useEffect(() => {
    if (!article) return;

    if (article.book.user.nickname !== user.nickname) {
      toastError('수정 권한이 없습니다.');
      router.push('/');
      return;
    }
    setOriginalArticle(article);
  }, [article]);

  return (
    <PageNoScrollWrapper>
      <EditHead />
      <Editor handleModalOpen={handleModalOpen} originalArticle={originalArticle} />

      {isModalShown &&
        ((originalArticle && (
          <Modal title="글 수정하기" handleModalClose={handleModalClose}>
            <ModifyModal books={books} originalArticle={originalArticle} />
          </Modal>
        )) || (
          <Modal title="글 발행하기" handleModalClose={handleModalClose}>
            <PublishModal books={books} />
          </Modal>
        ))}
    </PageNoScrollWrapper>
  );
}
