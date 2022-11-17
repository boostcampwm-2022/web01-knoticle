import styled from 'styled-components';

export const Dimmed = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ModalInner = styled.div`
  width: 486px;
  height: 500px;
  margin-top: 150px;
  padding: 32px;
  background: var(--white-color);
  border-radius: 30px;
  z-index: 1;
`;

export const ButtonWrapper = styled.div<{ hasBackward?: boolean }>`
  display: flex;
  justify-content: space-between;

  img:first-child {
    visibility: ${(props) => (props.hasBackward ? 'visible' : 'hidden')};
  }
`;

export const ModalTitle = styled.div`
  text-align: center;
`;
