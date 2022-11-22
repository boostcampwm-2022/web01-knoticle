import styled from 'styled-components';

import { TopBar } from '@styles/layout';

export const GNBbar = styled(TopBar)`
  width: 100%;
  border-bottom: 1px solid #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 50px;
  box-sizing: border-box;
  background-color: var(--light-yellow-color);
`;

export const Logo = styled.div`
  font-family: 'Sofia';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 57px;
  color: var(--title-active-color);
`;

export const IconsContainer = styled.div`
  width: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
