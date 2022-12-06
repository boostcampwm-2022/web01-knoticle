import { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { createTemporaryArticleApi, getTemporaryArticleApi } from '@apis/articleApi';
import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import useFetch from '@hooks/useFetch';

import { Bar, ButtonGroup, ExitButton, PublishButton, TemporaryButton } from './styled';

interface EditBarProps {
  handleModalOpen: () => void;
}

export default function EditBar({ handleModalOpen }: EditBarProps) {
  const article = useRecoilValue(articleState);
  const setBuffer = useSetRecoilState(articleBuffer);

  const { data: temporaryArticle, execute: getTemporaryArticle } = useFetch(getTemporaryArticleApi);
  const { execute: createTemporaryArticle } = useFetch(createTemporaryArticleApi);

  const handleLoadButton = () => {
    getTemporaryArticle();
  };

  const handleSaveButton = () => {
    createTemporaryArticle({ title: article.title, content: article.content });
  };

  useEffect(() => {
    if (!temporaryArticle) return;

    setBuffer({
      title: temporaryArticle.title,
      content: temporaryArticle.content,
    });
  }, [temporaryArticle]);

  return (
    <Bar>
      <ButtonGroup>
        <ExitButton>나가기</ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton onClick={() => handleLoadButton()}>불러오기</TemporaryButton>
        <TemporaryButton onClick={() => handleSaveButton()}>저장</TemporaryButton>
        <PublishButton onClick={handleModalOpen}>발행</PublishButton>
      </ButtonGroup>
    </Bar>
  );
}
