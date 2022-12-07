import styled from 'styled-components';

import { TextLarge, TextMedium } from '@styles/common';

export const ModifyModalWrapper = styled.div`
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

export const WarningLabel = styled(TextMedium)`
  color: var(--red-color);
`;
