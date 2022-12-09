import Image from 'next/image';
import Link from 'next/link';

import styled, { keyframes } from 'styled-components';

import { Flex } from '@styles/layout';

const slide = keyframes`
0% {
    width:0px;
}
100% {
    width:250px;
}
`;

export const TocWrapper = styled(Flex)`
  /* 고정크기? %? */
  flex-basis: 300px;
  height: calc(100vh - 67px);
  overflow: hidden;
  background-color: var(--primary-color);
  color: var(--white-color);
  flex-direction: column;
  justify-content: space-between;
  // animation: ${slide} 1s ease-in-out;

  @media ${(props) => props.theme.mobile} {
    position: absolute;
    z-index: 5;
    width: 100%;
  }
`;

export const TocSideBar = styled.div`
  padding: 30px 24px 10px 24px;
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
  color: var(--grey-01-color);
  border-radius: 20px;
  padding: 24px;
  margin-top: 10px;
  overflow: auto;
  height: calc(100vh - 357px);

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--grey-02-color);
    border-radius: 10px;
  }
`;

export const TocList = styled.div`
  margin-top: 10px;
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
export const TocArticleTitle = styled(Link)<{ count: number }>`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: #c29880;
  display: block;
  margin-bottom: 5px;
  padding-left: ${(props) => `${props.count}px`};
`;

export const TocProfile = styled(Link)`
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 20px;
  text-decoration: none;
  color: inherit;
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
