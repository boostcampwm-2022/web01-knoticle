import Image from 'next/image';

import Add from '@assets/ico_add.svg';
import EditWhite from '@assets/ico_edit_white.svg';

import { Button, FABWrapper } from './styled';

export default function FAB() {
  return (
    <FABWrapper>
      <Button>
        <Image src={Add} alt="책 추가" />
      </Button>
      <Button>
        <Image src={EditWhite} alt="책 수정" />
      </Button>
    </FABWrapper>
  );
}
