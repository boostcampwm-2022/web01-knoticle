import { CustomButton, Label } from './styled';

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
