import styled from 'styled-components';

import { Flex, FlexColumn } from '@styles/layout';

export const ArticleContainer = styled(Flex)`
  flex: 1;
  height: calc(var(--window-inner-height) - 67px);
  @media ${(props) => props.theme.mobile} {
    height: calc(var(--window-inner-height));
  }
`;
export const ArticleLeftBtn = styled.div`
  position: fixed;
  top: 50%;
  margin-left: 20px;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    top: 97px;
  }
`;
export const ArticleRightBtn = styled.div`
  position: fixed;
  top: 50%;
  right: 25px;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    top: 97px;
  }
`;
export const ArticleMain = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 50px;
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
    padding: 50px 16px;
  }
`;
export const ArticleTitle = styled.h1`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 25px 0;
  text-align: left;
  font-size: 24px;
  font-weight: 700;
`;
export const ArticleTitleBtnBox = styled(Flex)`
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  border-top: 1px solid var(--grey-02-color);
  padding-top: 10px;
  margin-bottom: 30px;
`;
export const ArticleContents = styled.div`
  margin-top: 20px;
  height: 481px;
`;

export const ArticleContentsWrapper = styled(FlexColumn)``;
