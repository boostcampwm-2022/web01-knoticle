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

export const PageWrapper = styled.div`
  padding-top: 64px;
  min-height: calc(100vh - 67px);
  background-color: var(--light-yellow-color);
`;

export const PageInnerSmall = styled(FlexColumnCenter)`
  margin: 0 auto;
  max-width: 900px;
`;

export const PageInnerLarge = styled(FlexColumnCenter)`
  margin: 0 auto;
  max-width: 1200px;
`;
