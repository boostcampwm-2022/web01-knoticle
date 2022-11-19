import styled from 'styled-components';

import { FlexCenter, Flex } from '../../../styles/layout';

export const ArticleContainer = styled(Flex)`
  width: 100%;
`;
export const ArticleLeftBtn = styled(FlexCenter)`
  flex-basis: 5%;
`;
export const ArticleRightBtn = styled(FlexCenter)`
  flex-basis: 5%;
`;
export const ArticleContents = styled(FlexCenter)`
  flex-basis: 90%;
  flex-direction: column;
`;
export const ArticleTitle = styled(Flex)`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 25px 0;
  justify-content: space-between;
`;
export const ArticleTitleBtnBox = styled(Flex)``;
