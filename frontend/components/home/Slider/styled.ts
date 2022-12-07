import Image from 'next/image';

import styled from 'styled-components';

import { FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SliderContent = styled(FlexColumn)`
  max-width: 1200px;
  overflow: hidden;
  gap: 10px;
  margin-top: 30px;
`;

export const SliderInfoContainer = styled(FlexSpaceBetween)`
  padding: 0px 10px;
`;

export const SliderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SliderTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const SliderBookContainer = styled.div`
  position: relative;
`;

export const SliderTrack = styled.div<{ curBookIndex: number }>`
  display: flex;
  ${(props) => `transform: translateX(-${300 * props.curBookIndex}px);`}
  transition: transform 700ms ease 0ms;
  z-index: 4;
`;

export const SliderIndicatorContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 4px;
`;

export const SliderBookWrapper = styled.div``;

export const SliderIndicator = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 8px;
  border-radius: 10px;

  ${(props) =>
    props.isActive
      ? 'background-color: var(--primary-color)'
      : 'background-color: var(--grey-02-color)'};
`;

export const SliderIcon = styled(Image)<{ isvisible: string }>`
  cursor: pointer;
  ${(props) => (props.isvisible === 'true' ? '' : 'visibility : hidden')}
`;
