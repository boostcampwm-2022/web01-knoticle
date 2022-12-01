import styled from 'styled-components';

import { TextLarge } from '@styles/common';

export const ScrapModalWrapper = styled.div`
  margin-top: 32px;

  > div {
    margin-bottom: 16px;
  }
`;

export const Label = styled(TextLarge)``;
export const ArticleWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: auto;
`;
