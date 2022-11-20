import styled from 'styled-components';

export const BookListTabWrapper = styled.div`
  margin-top: 30px;
`;
export const TabTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  /* background-color: red; */
`;
export const LeftTab = styled.div`
  padding-right: 30px;
`;
export const RightTab = styled.div`
  padding-left: 30px;
`;
export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

export const TempBook = styled.div`
  width: 280px;
  height: 480px;
  background-color: orange;
  margin: 10px;
`;
