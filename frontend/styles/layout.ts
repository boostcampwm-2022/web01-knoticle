import styled from 'styled-components';

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexCenterPositioner = styled(FlexCenter)`
  width: 80%;
  left: 0;
  right: 0;
  margin: auto;
`;
