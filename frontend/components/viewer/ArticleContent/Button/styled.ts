import styled from 'styled-components';

import { TextSmall } from '@styles/common';

export const ViewerButton = styled.button`
  max-width: 150px;
  border-radius: 10px;
  border: 1px solid var(--grey-02-color);
  background-color: white;
  width: fit-content;
`;

export const ViewerLabel = styled(TextSmall)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
