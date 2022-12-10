import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { Flex, FlexColumnSpaceBetween } from '@styles/layout';

interface TocWrapperProps {
  isOpen: boolean;
}

export const TocWrapper = styled(FlexColumnSpaceBetween)<TocWrapperProps>`
  flex-basis: ${(props) => (props.isOpen ? '300px' : '0')};
  height: calc(var(--window-inner-height) - 67px);
  color: var(--white-color);
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 100;

  * {
    white-space: nowrap;
  }

  @media ${(props) => props.theme.mobile} {
    position: absolute;
    z-index: 5;
    width: ${(props) => (props.isOpen ? '100%' : '0')};
    height: calc(var(--window-inner-height));
  }
`;

export const TocOpenButton = styled.button<{ isscrolldown: 'true' | 'false' }>`
  position: absolute;
  margin-top: 24px;
  z-index: 0;

  @media ${(props) => props.theme.mobile} {
    top: ${(props) => (props.isscrolldown === 'true' ? '-127px' : '60px')};
    transition: top 0.2s ease-in-out;
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
  height: calc(var(--window-inner-height) - 357px);

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--grey-02-color);
    border-radius: 10px;
  }

  @media ${(props) => props.theme.mobile} {
    height: calc(var(--window-inner-height)-290px);
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
