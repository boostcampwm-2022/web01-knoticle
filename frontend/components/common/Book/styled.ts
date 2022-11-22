import styled from 'styled-components';

import { TextXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const BookWrapper = styled(FlexColumn)`
  width: 280px;
  height: 480px;

  background: #ffffff;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  overflow: hidden;

  color: var(--grey-01-color);
`;

export const BookInfoContainer = styled(FlexColumn)`
  padding: 24px;
  gap: 18px;
`;

export const BookTitle = styled.div`
  div:nth-child(1) {
    font-weight: 700;
  }
`;

export const Bookmark = styled(FlexColumn)`
  align-items: center;
  gap: 4px;
`;

export const BookContentsInfo = styled(FlexColumn)`
  gap: 8px;
`;

export const BookContents = styled(TextXSmall)`
  display: flex;
  flex-direction: column;

  div {
    border-bottom: 1px solid var(--grey-02-color);
    height: 28px;
    display: flex;
    align-items: center;
  }

  div:nth-child(1) {
    border-top: 1px solid var(--primary-color);
  }
`;
