import Image from 'next/image';
import Link from 'next/link';

import styled, { keyframes } from 'styled-components';

import { Flex } from '@styles/layout';

const slide = keyframes`
from {
    left:-200px;
}
to {
    left:0px;
}
`;

export const TocWrapper = styled(Flex)`
  /* 고정크기? %? */
  flex-basis: 250px;
  height: calc(100vh - 67px);
  background-color: var(--primary-color);
  color: var(--white-color);
  flex-direction: column;
  position: relative;
  animation: ${slide} 1s ease-in-out;
`;

export const TocSideBar = styled.div`
  padding: 30px;
  flex-basis: 90%;
`;

export const TocIcons = styled(Flex)`
  justify-content: space-between;
`;

export const TocTitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--white-color);
`;
export const TocContainer = styled.div`
  background-color: var(--white-color);
  height: 70%;
  color: var(--grey-01-color);
  border-radius: 20px;
  padding: 20px;
  margin-top: 10px;
  overflow: auto;
`;
export const TocList = styled.div`
  margin: 5px;
`;

export const TocArticle = styled(Link)`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 5px;

  &.current {
    color: #ca7647;
  }
`;

export const TocProfile = styled(Flex)`
  justify-content: end;
  align-items: end;
  flex-basis: 10%;
  padding: 20px;
`;
export const TocProfileText = styled(Flex)`
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding-left: 10px;
`;

export const TocImgWrapper = styled(Image)`
  width: 70px;
  height: 70px;
  position: relative;
  margin-left: 10px;
  border-radius: 50%;
`;
