import styled from 'styled-components';

import { TextMedium } from '@styles/common';

export const CustomButton = styled.button<{ theme: 'primary' | 'second' }>`
  padding: 16px 0;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--grey-02-color);
  border: none;

  ${(props) =>
    props.theme === 'primary'
      ? { 'background-color': 'var(--primary-color)', color: 'var(--white-color)' }
      : {
          'background-color': 'transparent',
          border: '1px solid var(--primary-color)',
          color: 'var(--title-active-color)',
        }};
`;

export const Label = styled(TextMedium)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
