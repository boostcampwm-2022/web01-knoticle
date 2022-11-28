import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const SelectedArea = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &.open {
    transform: rotate(180deg);
  }
`;

export const SelectedItem = styled.div`
  color: var(--title-active-color);
`;

export const Placeholder = styled.div`
  color: var(--grey-01-color);
`;

export const ItemWrapper = styled.ul`
  width: 100%;
  background-color: var(--white-color);
  margin-top: 8px;
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;
  position: absolute;
  z-index: 100;
`;

export const Item = styled.li`
  padding: 16px;
  color: var(--title-active-color);

  :not(:last-child) {
    border-bottom: 1px solid var(--grey-02-color);
  }
`;
