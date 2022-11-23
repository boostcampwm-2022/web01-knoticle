import { useEffect, useState } from 'react';

import { getBooksApi } from '@apis/bookApi';
import Modal from '@components/common/Modal';
import EditBar from '@components/edit/EditBar';
import Editor from '@components/edit/Editor';
import PublishModal from '@components/edit/PublishModal';
import useFetch from '@hooks/useFetch';

export default function EditorPage() {
  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);

  const books = [
    {
      id: 1,
      thumbnail_image: 'https://sdlkasdlkf',
      title: '리액트 마스터하기1',
      created_at: '2022-11-17T04:25:35.464Z',
      deleted_at: null,
      user: {
        nickname: 'dahyeon',
      },
      scraps: [],
      isBookmarked: false,
    },
    {
      id: 2,
      thumbnail_image: 'https://sdlkasdlkf',
      title: '리액트 마스터하기2',
      created_at: '2022-11-17T04:25:35.464Z',
      deleted_at: null,
      user: {
        nickname: 'dahyeon',
      },
      scraps: [
        {
          id: 1,
          order: 1,
          article: {
            id: 3,
            title: 'Create-react-app',
          },
        },
        {
          id: 2,
          order: 2,
          article: {
            id: 5,
            title: 'JSX',
          },
        },
      ],
    },
  ];

  // const { data: books, execute: getBooks } = useFetch(getBooksApi);

  // useEffect(() => {
  // getBooks({ userId: 4 });
  // }, []);

  return (
    <>
      <EditBar handleModalOpen={() => handleModalOpen()} />
      <Editor />
      {isModalShown && (
        <Modal title="글 발행하기" handleModalClose={handleModalClose}>
          <PublishModal books={books} />
        </Modal>
      )}
    </>
  );
}
