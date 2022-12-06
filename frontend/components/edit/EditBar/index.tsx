import { useRouter } from 'next/router';

import { Bar, ButtonGroup, ExitButton, PublishButton, TemporaryButton } from './styled';

interface EditBarProps {
  handleModalOpen: () => void;
}

export default function EditBar({ handleModalOpen }: EditBarProps) {
  const router = useRouter();

  const handleExitButton = () => {
    const confirm = window.confirm('정말 나가시겠습니까?');

    if (confirm) router.push('/');
  };

  return (
    <Bar>
      <ButtonGroup>
        <ExitButton onClick={() => handleExitButton()}>나가기</ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton>불러오기</TemporaryButton>
        <TemporaryButton>임시 저장</TemporaryButton>
        <PublishButton onClick={handleModalOpen}>발행</PublishButton>
      </ButtonGroup>
    </Bar>
  );
}
