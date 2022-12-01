import { useEffect, useState } from 'react';

import { getBooksApi } from '@apis/bookApi';
import Modal from '@components/common/Modal';
import Editor from '@components/edit/Editor';
import PublishModal from '@components/edit/PublishModal';
import useFetch from '@hooks/useFetch';

export default function EditorPage() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const { data: books, execute: getBooks } = useFetch(getBooksApi);

  useEffect(() => {
    getBooks({ userId: 4 });
  }, []);

  return (
    <>
      <Editor handleModalOpen={handleModalOpen} />
      {isModalShown && (
        <Modal title="글 발행하기" handleModalClose={handleModalClose}>
          <PublishModal books={books} />
        </Modal>
      )}
    </>
  );
}
