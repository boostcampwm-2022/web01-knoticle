import styled from 'styled-components';

import { TextMedium } from '../../../styles/common';

const CustomButton = styled.button<{ theme: 'primary' | 'second' }>`
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

const Label = styled(TextMedium)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

interface ButtonProps {
  theme: 'primary' | 'second';
  children: React.ReactNode;
  onClick: () => void;
}

export default function ModalButton({ theme, children, onClick }: ButtonProps) {
  return (
    <CustomButton type="button" onClick={onClick} theme={theme}>
      <Label>{children}</Label>
    </CustomButton>
  );
}
