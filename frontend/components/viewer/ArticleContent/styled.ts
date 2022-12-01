import styled from 'styled-components';

import { Flex } from '@styles/layout';

export const ArticleContainer = styled(Flex)`
  flex: 1;
  height: calc(100vh - 67px);
`;
export const ArticleLeftBtn = styled.div`
  position: fixed;
  top: 50%;
  margin-left: 20px;
  cursor: pointer;
`;
export const ArticleRightBtn = styled.div`
  position: fixed;
  top: 50%;
  right: 25px;
  cursor: pointer;
`;
export const ArticleMain = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 50px;
  overflow: auto;
`;
export const ArticleTitle = styled(Flex)`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 25px 0;
  justify-content: space-between;
`;
export const ArticleTitleBtnBox = styled(Flex)``;
export const ArticleContents = styled.div`
  margin-top: 20px;
  height: 481px;
`;
