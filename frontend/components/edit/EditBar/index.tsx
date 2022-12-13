import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { createTemporaryArticleApi, getTemporaryArticleApi } from '@apis/articleApi';
import ExitIcon from '@assets/ico_exit.svg';
import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import useFetch from '@hooks/useFetch';
import { toastSuccess } from '@utils/toast';

import { Bar, ButtonGroup, ExitButton, PublishButton, TemporaryButton } from './styled';

interface EditBarProps {
  handleModalOpen: () => void;
  isModifyMode: boolean;
}

export default function EditBar({ handleModalOpen, isModifyMode }: EditBarProps) {
  const article = useRecoilValue(articleState);
  const setBuffer = useSetRecoilState(articleBuffer);
  const router = useRouter();

  const { data: temporaryArticle, execute: getTemporaryArticle } = useFetch(getTemporaryArticleApi);
  const { execute: createTemporaryArticle } = useFetch(createTemporaryArticleApi);

  const handleLoadButton = () => {
    const confirm = window.confirm('현재 작성하신 글이 사라집니다.\n정말 불러오시겠습니까?');

    if (confirm) getTemporaryArticle();
  };

  const handleSaveButton = () => {
    const confirm = window.confirm('기존에 임시 저장한 글이 사라집니다.\n정말 저장하시겠습니까?');

    if (confirm) {
      createTemporaryArticle({ title: article.title, content: article.content });

      toastSuccess('글을 임시 저장했습니다.');
    }
  };

  const handleExitButton = () => {
    const confirm = window.confirm('정말 나가시겠습니까?');

    if (confirm) router.push('/');
  };

  useEffect(() => {
    if (!temporaryArticle) return;

    setBuffer({
      title: temporaryArticle.title,
      content: temporaryArticle.content,
    });

    toastSuccess('임시 저장된 글을 불러왔습니다.');
  }, [temporaryArticle]);

  return (
    <Bar>
      <ButtonGroup>
        <ExitButton tabIndex={-1} onClick={() => handleExitButton()}>
          <Image src={ExitIcon} alt="Exit Icon" />
        </ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton onClick={() => handleLoadButton()}>불러오기</TemporaryButton>
        <TemporaryButton onClick={() => handleSaveButton()}>저장하기</TemporaryButton>
        <PublishButton onClick={handleModalOpen}>
          {isModifyMode ? '수정하기' : '발행하기'}
        </PublishButton>
      </ButtonGroup>
    </Bar>
  );
}
