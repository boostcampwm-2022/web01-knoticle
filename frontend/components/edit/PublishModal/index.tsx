import ModalButton from '../../common/Modal/ModalButton';
import Dropdown from '../Dropdown';
import { Label, PublishModalWrapper } from './styled';

export default function PublishModal() {
  return (
    <PublishModalWrapper>
      <Label>책 선택</Label>
      <Dropdown label="글이 담길 책을 선택해주세요." />
      <Label>순서 선택</Label>
      <Dropdown label="글을 넣을 순서를 선택해주세요." />
      <ModalButton theme="primary" onClick={() => console.log('click')}>
        발행하기
      </ModalButton>
    </PublishModalWrapper>
  );
}
