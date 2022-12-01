import styled from 'styled-components';

export const FabWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  right: 0;
  margin: 40px;
  gap: 10px;
  z-index: 14;
`;

export const FabButton = styled.button<{ isGreen?: boolean }>`
  display: center;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${(props) => (props.isGreen ? 'var(--green-color)' : 'var(--primary-color)')};
`;
