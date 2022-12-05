import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import Modal from '@components/common/Modal';
import EditHead from '@components/edit/EditHead';
import Editor from '@components/edit/Editor';
import PublishModal from '@components/edit/PublishModal';
import useFetch from '@hooks/useFetch';

export default function EditorPage() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const { data: books, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);

  const user = useRecoilValue(signInStatusState);

  useEffect(() => {
    getUserKnottedBooks(user.nickname);
  }, []);

  return (
    <>
      <EditHead />
      <Editor handleModalOpen={handleModalOpen} />
      {isModalShown && (
        <Modal title="글 발행하기" handleModalClose={handleModalClose}>
          <PublishModal books={books} />
        </Modal>
      )}
    </>
  );
}
