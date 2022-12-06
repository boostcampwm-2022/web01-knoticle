import { Bar, ButtonGroup, ExitButton, PublishButton, TemporaryButton } from './styled';

interface EditBarProps {
  handleModalOpen: () => void;
  isModifyMode: boolean;
}

export default function EditBar({ handleModalOpen, isModifyMode }: EditBarProps) {
  return (
    <Bar>
      <ButtonGroup>
        <ExitButton>나가기</ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton>불러오기</TemporaryButton>
        <TemporaryButton>임시 저장</TemporaryButton>
        <PublishButton onClick={handleModalOpen}>
          {isModifyMode ? '수정하기' : '발행'}
        </PublishButton>
      </ButtonGroup>
    </Bar>
  );
}
