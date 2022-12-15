import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { TextSmall } from '@styles/common';
import { Flex, FlexColumn, FlexColumnSpaceBetween } from '@styles/layout';

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
  z-index: 80;

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

export const TocSideBar = styled(FlexColumn)`
  height: 100%;
  padding: 24px 24px 0 24px;
  gap: 8px;
`;

export const TocIcons = styled(Flex)`
  justify-content: space-between;
`;

export const TocTitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--white-color);
`;

export const TocContainer = styled.div`
  flex: 1 1 0;
  margin-top: 10px;
  padding: 24px;
  color: var(--grey-01-color);
  background-color: var(--white-color);
  border-radius: 16px;
  overflow-x: hidden;
  overflow-y: scroll;

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
  font-weight: 600;
`;
export const TocCurrentArticle = styled.div`
  font-size: 14px;
  line-height: 20px;
  display: block;
  margin-bottom: 5px;
  color: var(--primary-color);
`;
export const TocCurrentText = styled(TextSmall)`
  cursor: 'pointer';
  font-weight: 600;
`;

export const TocArticleTitle = styled(Link)<{ padding: number }>`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
  padding-left: ${(props) => `${props.padding}px`};

  &:hover {
    color: var(--primary-color);
  }
`;

export const TocProfile = styled(Link)`
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 16px 24px;
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
  object-fit: cover;
  border: 1px solid var(--grey-01-color);
  box-sizing: border-box;
`;
