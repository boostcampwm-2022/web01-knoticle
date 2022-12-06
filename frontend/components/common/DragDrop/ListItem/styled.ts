import Image from 'next/image';

import styled from 'styled-components';

export const Text = styled.span``;
export const Article = styled.div<{ isShown: true | false }>`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: inherit;
  display: ${(props) => (props.isShown ? 'flex' : 'none')};
  justify-content: space-between;
  align-items:center
  border-bottom: 1px solid var(--grey-02-color);
  padding:3px;
`;

export const MinusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: var(--red-color);
`;

export const MinusIcon = styled(Image)``;
