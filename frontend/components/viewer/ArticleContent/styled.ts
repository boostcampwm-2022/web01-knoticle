import styled from 'styled-components';

import { Flex, FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const ArticleContainer = styled(FlexColumn)`
  flex: 1;
  height: calc(var(--window-inner-height) - 67px);
  @media ${(props) => props.theme.mobile} {
    height: calc(var(--window-inner-height));
  }
`;
export const ArticleLeftBtn = styled.div<{ visibility: string }>`
  position: fixed;
  top: 50%;
  transform: translateX(-36px);
  visibility: ${(props) => props.visibility};
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    transform: translateX(0px);
    position: static;
  }
`;
export const ArticleRightBtn = styled.div<{ visibility: string }>`
  position: fixed;
  top: 50%;
  right: 25px;
  cursor: pointer;
  visibility: ${(props) => props.visibility};

  @media ${(props) => props.theme.mobile} {
    position: static;
  }
`;
export const ArticleMain = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 36px 50px;
  overflow-y: scroll;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--grey-02-color);
    border-radius: 10px;
  }

  @media ${(props) => props.theme.mobile} {
    padding: 112px 16px 32px 16px;
  }
`;
export const ArticleTitle = styled.h1`
  padding: 25px 0;
  text-align: left;
  font-size: 24px;
  font-weight: 700;
`;
export const ArticleTitleBtnBox = styled(Flex)`
  gap: 8px;
  margin-top: 16px;
  padding-top: 10px;
  margin-bottom: 30px;
  @media ${(props) => props.theme.tablet} {
    margin-top: 0px;
    padding-top: 0px;
    margin-bottom: 10px;
  }
`;
export const ArticleContents = styled.div`
  margin-top: 20px;
  height: 481px;
`;

export const ArticleContentsWrapper = styled(FlexColumn)``;

export const ArticleMoveBtnContainer = styled(FlexSpaceBetween)``;

export const ArticleTitleWrapper = styled(FlexSpaceBetween)`
  border-bottom: 1px solid black;
  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  }
`;
