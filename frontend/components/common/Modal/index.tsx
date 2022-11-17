import { Dimmed, ModalInner, ModalWrapper } from './styled';

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Dimmed />
      <ModalWrapper>
        <ModalInner>{children}</ModalInner>
      </ModalWrapper>
    </>
  );
}
