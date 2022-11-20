import Image from 'next/image';

import Add from '../../assets/ico_add.svg';
import EditWhite from '../../assets/ico_edit_white.svg';
import { FABButton, FABWrapper } from './styled';

export default function FAB() {
  return (
    <FABWrapper>
      <FABButton>
        <Image src={Add} alt="책 추가" />
      </FABButton>
      <FABButton>
        <Image src={EditWhite} alt="책 수정" />
      </FABButton>
    </FABWrapper>
  );
}
