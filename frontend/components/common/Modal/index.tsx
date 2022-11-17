import Image from 'next/image';

import BackwardIcon from '../../../assets/ico_backward.svg';
import CancelIcon from '../../../assets/ico_cancel.svg';
import { TextLinkMedium } from '../../../styles/common';
import { ButtonWrapper, Dimmed, ModalInner, ModalTitle, ModalWrapper } from './styled';

interface ModalProps {
  title: string;
  hasBackward?: boolean;
  children: React.ReactNode;
}

export default function Modal({ title, hasBackward, children }: ModalProps) {
  return (
    <>
      <Dimmed />
      <ModalWrapper>
        <ModalInner>
          <ButtonWrapper hasBackward={hasBackward}>
            <Image src={BackwardIcon} alt="Backward Icon" />
            <Image src={CancelIcon} alt="Cancel Icon" />
          </ButtonWrapper>
          <ModalTitle>
            <TextLinkMedium>{title}</TextLinkMedium>
          </ModalTitle>
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.defaultProps = {
  hasBackward: false,
};
