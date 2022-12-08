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
  box-sizing: border-box;
  gap: 20px 0;
  padding: 20px;

  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
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
  position: relative;
`;

export const EditModalOpener = styled.div`
  position: absolute;
  z-index: 4;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const MinusButton = styled.button`
  z-index: 5;
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
