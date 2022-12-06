import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getArticleApi } from '@apis/articleApi';
import { getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import Modal from '@components/common/Modal';
import EditHead from '@components/edit/EditHead';
import Editor from '@components/edit/Editor';
import PublishModal from '@components/edit/PublishModal';
import useFetch from '@hooks/useFetch';
import { IArticle } from '@interfaces';

export default function EditorPage() {
  const [isModalShown, setModalShown] = useState(false);
  const [originalArticle, setOriginalArticle] = useState<IArticle | undefined>(undefined);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const { data: books, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);
  const { data: article, execute: getArticle } = useFetch(getArticleApi);

  const user = useRecoilValue(signInStatusState);

  const router = useRouter();

  useEffect(() => {
    getUserKnottedBooks(user.nickname);
  }, [user.nickname]);

  useEffect(() => {
    if (router.query.id) getArticle(router.query.id);
  }, [router.query]);

  useEffect(() => {
    if (!article) return;

    if (article.book.user.nickname !== user.nickname) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
    setOriginalArticle(article);
  }, [article]);

  return (
    <>
      <EditHead />
      <Editor handleModalOpen={handleModalOpen} originalArticle={originalArticle} />
      {isModalShown && (
        <Modal title="글 발행하기" handleModalClose={handleModalClose}>
          {originalArticle ? (
            <PublishModal books={books} originalArticle={originalArticle} />
          ) : (
            <PublishModal books={books} />
          )}
        </Modal>
      )}
    </>
  );
}
