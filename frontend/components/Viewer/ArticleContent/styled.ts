import styled from 'styled-components';

import { Flex } from '@styles/layout';

export const ArticleContainer = styled(Flex)`
  flex-basis: 100%;
  height: calc(100vh - 66px);
`;
export const ArticleLeftBtn = styled.div`
  position: fixed;
  top: 50%;
  margin-left: 10px;
`;
export const ArticleRightBtn = styled.div`
  position: fixed;
  top: 50%;
  right: 25px;
`;
export const ArticleMain = styled(Flex)`
  flex-direction: column;
  padding: 30px;
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
