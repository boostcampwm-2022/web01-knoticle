import styled from 'styled-components';

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Flex = styled.div`
  display: flex;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageColorWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--light-yellow-color);
`;

export const FlexCenterPositioner = styled(FlexCenter)`
  width: 70%;
  left: 0;
  right: 0;
  margin: auto;
  flex-direction: column;
`;
