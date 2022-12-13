import styled from 'styled-components';

import { TopBar } from '@styles/layout';

export const Bar = styled(TopBar)`
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 4px;
  border-radius: 8px;
  line-height: 16px;
  font-family: 'Noto Sans KR';
`;

export const ExitButton = styled.button`
  > img {
    width: 32px;
    height: 32px;
  }
`;

export const TemporaryButton = styled(Button)`
  color: var(--title-active-color);
  background-color: transparent;
  border: 1px solid var(--grey-01-color);
`;

export const PublishButton = styled(Button)`
  color: var(--white-color);
  background-color: var(--primary-color);
  border: 1px solid #8f4c26;
`;
