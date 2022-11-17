import { useState } from 'react';

import Modal from '../components/common/Modal';

export default function ModalTest() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  return (
    <>
      <div
        style={{
          backgroundColor: 'tomato',
          color: '#fff',
        }}
      >
        asdasd
      </div>
      <button type="button" onClick={handleModalOpen}>
        열어줘
      </button>
      {isModalShown && (
        <Modal title="Knoticle 시작하기" handleModalClose={handleModalClose}>
          Hello
        </Modal>
      )}
    </>
  );
}
