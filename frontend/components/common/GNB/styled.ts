import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { FlexCenter, TopBar } from '@styles/layout';

export const GNBbar = styled(TopBar)`
  position: relative;
  width: 100%;
  border-bottom: 1px solid #222222;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 4px 30px;
  box-sizing: border-box;
  background-color: var(--light-yellow-color);
`;

export const SpaceBox = styled.div``;

export const LogoWrapper = styled(FlexCenter)`
  position: absolute;
  width: 110px;
  left: 0;
  right: 0;
  margin: auto;
`;

export const Logo = styled(Link)`
  margin: auto;
  font-family: 'Sofia';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 57px;
  color: var(--title-active-color);
  text-decoration: none;
`;

export const IconsContainer = styled.div`
  /* width: 96px; */
  gap: 20px;
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
