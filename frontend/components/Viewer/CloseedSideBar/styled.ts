import styled from 'styled-components';

import { FlexCenter } from '@styles/layout';

export const ClosedSideBarWrapper = styled.div`
  min-width: 50px;
  height: calc(100vh - 67px);
  background-color: var(--primary-color);
`;

export const ClosedSidebarIcons = styled(FlexCenter)`
  padding-top: 30px;
`;
