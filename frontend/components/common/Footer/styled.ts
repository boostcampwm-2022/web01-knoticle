import Link from 'next/link';

import styled from 'styled-components';

import { FlexCenter } from '@styles/layout';

export const FooterContent = styled(FlexCenter)`
  flex-direction: column;
  padding: 50px;
  gap: 8px;
  color: var(--grey-01-color);
  font-size: 14px;
`;

export const FooterLink = styled(Link)`
  color: var(--primary-color);
  font-size: 14px;

  :hover {
    color: var(--primary-color);
    text-decoration-line: underline;
  }
`;

export default FooterContent;
