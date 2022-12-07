import { SpinnerInner, SpinnerWrapper } from './styled';

interface SpinnerProps {
  width: number;
  height: number;
  borderWidth?: number;
}

export default function Spinner({ width, height, borderWidth }: SpinnerProps) {
  return (
    <SpinnerWrapper width={width} height={height}>
      <SpinnerInner borderWidth={borderWidth} />
    </SpinnerWrapper>
  );
}

Spinner.defaultProps = {
  borderWidth: 30,
};
