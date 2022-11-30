import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';

export const BookListTabWrapper = styled.div`
  margin-top: 20px;
`;
export const TabTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 30px;
`;
export const TabTitleContent = styled(TextLinkMedium)<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  ${(props) => (props.isActive ? 'color: var(--primary-color); text-decoration:underline' : '')}
`;

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
`;
