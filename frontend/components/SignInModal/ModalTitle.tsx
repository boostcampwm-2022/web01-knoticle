import styled from 'styled-components';

import { TextLinkMedium } from '../../styles/common';

const Wrapper = styled.h2`
  margin: 30px;
`;

export default function ModalTitle({ title }: { title: string }) {
  return (
    <Wrapper>
      <TextLinkMedium>{title}</TextLinkMedium>
    </Wrapper>
  );
}
