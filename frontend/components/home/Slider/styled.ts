import styled from 'styled-components';

import { FlexColumn, FlexSpaceBetween } from '@styles/layout';

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SliderContent = styled(FlexColumn)`
  width: fit-content;
  gap: 10px;
  margin-top: 30px;
`;

export const SliderInfoContainer = styled(FlexSpaceBetween)``;

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
  display: flex;
  gap: 20px;
`;

export const SliderIndicatorContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 4px;
`;

export const SliderIndicator = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 8px;
  border-radius: 10px;

  ${(props) =>
    props.isActive
      ? 'background-color: var(--primary-color)'
      : 'background-color: var(--grey-02-color)'};
`;
