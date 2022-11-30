import Image from 'next/image';

import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';

export const BookListTabWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`;
export const TabTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 30px;
`;
export const TabTitleContent = styled(TextLinkMedium)<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  ${(props) => (props.isActive ? 'color: var(--primary-color); text-decoration:underline' : '')}
`;

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
`;

export const EditModeIndicator = styled(TextLinkMedium)`
  position: absolute;
  background-color: var(--red-color);
  padding: 5px 10px;
  color: var(--white-color);
  width: auto;
  border-radius: 10px;
  right: 0;
`;

export const EditBookWrapper = styled.div`
  z-index: 4;
  cursor: pointer;
  position: relative;
`;

export const MinusButton = styled.button`
  position: absolute;
  display: center;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--red-color);
  right: -10px;
  top: -10px;
`;

export const MinusIcon = styled(Image)``;
