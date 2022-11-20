import styled from 'styled-components';

import { TextLinkMedium } from '../../../styles/common';

export const BookListTabWrapper = styled.div`
  margin-top: 20px;
`;
export const TabTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
export const LeftTab = styled(TextLinkMedium)`
  padding-right: 30px;
  cursor: pointer;
`;
export const RightTab = styled(TextLinkMedium)`
  padding-left: 30px;
  cursor: pointer;
`;
export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
`;
