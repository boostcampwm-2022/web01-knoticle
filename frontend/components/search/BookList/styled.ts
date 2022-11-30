import styled from 'styled-components';

export const BookContainer = styled.div`
  width: 280px;
`;

export const BookListWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 30px;

  margin-bottom: 30px;
`;
