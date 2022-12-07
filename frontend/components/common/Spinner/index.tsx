import { SpinnerInner, SpinnerWrapper } from './styled';

interface SpinnerStyle {
  width: number;
  height: number;
  borderWidth: number;
}

interface SpinnerProps {
  style: SpinnerStyle;
}

export default function Spinner({ style }: SpinnerProps) {
  return (
    <SpinnerWrapper width={style.width} height={style.height}>
      <SpinnerInner borderWidth={style.borderWidth} />
    </SpinnerWrapper>
  );
}
