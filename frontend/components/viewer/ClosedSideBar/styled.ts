import styled from 'styled-components';

import { FlexCenter } from '@styles/layout';

export const ClosedSideBarWrapper = styled.div`
  min-width: 30px;
  height: calc(var(--window-inner-height) - 67px);
  background-color: var(--primary-color);
`;

export const ClosedSidebarIcons = styled(FlexCenter)`
  padding-top: 30px;
`;
