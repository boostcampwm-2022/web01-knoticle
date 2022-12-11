import Image from 'next/image';

import styled from 'styled-components';

import { TextXSmall } from '@styles/common';
import { Flex } from '@styles/layout';

export const Text = styled.span``;
export const Article = styled.div<{ isShown: true | false }>`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: inherit;
  display: ${(props) => (props.isShown ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--grey-02-color);
  padding: 5px;
`;

export const MinusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--red-color);
`;

export const MinusIcon = styled(Image)``;
export const TextWapper = styled(Flex)``;

export const OriginalBadge = styled(TextXSmall)`
  // background-color: var(--grey-02-color);
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;
  padding: 1px 3px;
  margin-left: 5px;
`;
