import { Bar, ButtonGroup, ExitButton, PublishButton, TemporaryButton } from './styled';

export default function EditBar() {
  return (
    <Bar>
      <ButtonGroup>
        <ExitButton>나가기</ExitButton>
      </ButtonGroup>
      <ButtonGroup>
        <TemporaryButton>불러오기</TemporaryButton>
        <TemporaryButton>임시 저장</TemporaryButton>
        <PublishButton>발행</PublishButton>
      </ButtonGroup>
    </Bar>
  );
}
