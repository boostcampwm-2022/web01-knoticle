import { ViewerButton, ViewerLabel } from './styled';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function ArticleButton({ children, onClick }: ButtonProps) {
  return (
    <ViewerButton type="button" onClick={onClick}>
      <ViewerLabel>{children}</ViewerLabel>
    </ViewerButton>
  );
}
