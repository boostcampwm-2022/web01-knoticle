import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--title-active-color);
  display: flex;
  align-items: center;
`;

export const SearchBarInput = styled.input`
  flex: 1;
  background-color: var(--light-yellow-color);
  padding: 8px;
  border: none;
  outline: none;
  font-size: 32px;
`;
