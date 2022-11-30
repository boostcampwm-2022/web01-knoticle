import Image from 'next/image';
import Link from 'next/link';

import { TopBar } from '@styles/layout';
import styled from 'styled-components';

export const GNBbar = styled(TopBar)`
  width: 100%;
  border-bottom: 1px solid #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 30px;
  box-sizing: border-box;
  background-color: var(--light-yellow-color);
`;

export const Logo = styled(Link)`
  font-family: 'Sofia';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 57px;
  color: var(--title-active-color);
  text-decoration: none;
`;

export const IconsContainer = styled.div`
  width: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled(Image)<{ isvisible?: string }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${(props) => (props.isvisible === 'false' ? 'visibility : hidden' : '')}
`;
