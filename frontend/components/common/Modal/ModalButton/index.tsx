import { CustomButton, Label } from './styled';

interface ButtonProps {
  theme: 'primary' | 'second';
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function ModalButton({ theme, children, onClick, disabled }: ButtonProps) {
  return (
    <CustomButton type="button" onClick={onClick} theme={theme} disabled={disabled}>
      <Label>{children}</Label>
    </CustomButton>
  );
}

ModalButton.defaultProps = {
  disabled: false,
};
