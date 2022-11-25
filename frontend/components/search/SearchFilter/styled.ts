import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

export const FilterGroup = styled.div`
  label:first-child {
    margin-right: 8px;
  }
`;

export const FilterLabel = styled.label`
  color: var(--title-active-color);
`;

export const FilterButton = styled.input`
  accent-color: var(--primary-color);
`;
