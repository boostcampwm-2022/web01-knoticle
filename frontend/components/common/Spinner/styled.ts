import styled from 'styled-components';

interface SpinnerWrapperProps {
  width: number;
  height: number;
}

export const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

interface SpinnerInnerProps {
  borderWidth?: number;
}

export const SpinnerInner = styled.div<SpinnerInnerProps>`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: ${(props) => props.borderWidth}px solid var(--grey-02-color);
  border-top: ${(props) => props.borderWidth}px solid var(--primary-color);
  border-radius: 50%;
  box-sizing: border-box;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s infinite ease;
`;
