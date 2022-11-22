import { useState } from 'react';

import Modal from '@components/common/Modal';
import EditBar from '@components/edit/EditBar';
import Editor from '@components/edit/Editor';
import PublishModal from '@components/edit/PublishModal';

export default function EditorPage() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  return (
    <>
      <EditBar handleModalOpen={() => handleModalOpen()} />
      <Editor />
      {isModalShown && (
        <Modal title="글 발행하기" handleModalClose={handleModalClose}>
          <PublishModal />
        </Modal>
      )}
    </>
  );
}
