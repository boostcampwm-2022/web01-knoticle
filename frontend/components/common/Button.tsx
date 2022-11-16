import styled from 'styled-components';

import { TextSmall } from '../../styles/common';

// 반응형으로 하면 CSS를 어떻게 처리하는 것이 좋을까요??
const BrownBtn = styled.button`
  width: 100%;
  height: 6vh;
  background-color: var(--primary-color);
  border-radius: 10px;
  border: 1px solid var(--grey-02-color);
  border: none;
`;

const Content = styled(TextSmall)`
  color: var(--white-color);
`;

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export default function Button({ title, onClick }: ButtonProps) {
  return (
    <BrownBtn type="button" onClick={onClick}>
      <Content>{title}</Content>
    </BrownBtn>
  );
}
