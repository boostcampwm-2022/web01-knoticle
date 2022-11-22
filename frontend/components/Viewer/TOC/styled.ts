import Image from 'next/image';

import styled from 'styled-components';

import { Flex } from '../../../styles/layout';

export const TocWrapper = styled(Flex)`
  /* 고정크기? %? */
  min-width: 250px;
  height: calc(100vh - 66px);
  background-color: var(--primary-color);
  color: var(--white-color);
  flex-direction: column;
`;

export const TocSideBar = styled.div`
  padding: 30px;
  flex-basis: 90%;
`;

export const TocIcons = styled(Flex)`
  justify-content: space-between;
`;

export const TocTitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--white-color);
`;
export const TocContainer = styled.div`
  background-color: var(--white-color);
  height: 70%;
  color: var(--grey-01-color);
  border-radius: 20px;
  padding: 20px;
  margin-top: 10px;
  overflow: auto;
`;
export const TocList = styled.div`
  margin: 5px;
`;

export const TocProfile = styled(Flex)`
  justify-content: end;
  align-items: end;
  flex-basis: 10%;
  padding: 20px;
`;
export const TocProfileText = styled(Flex)`
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding-left: 10px;
`;

export const TocImgWrapper = styled(Image)`
  width: 70px;
  height: 70px;
  position: relative;
  margin-left: 10px;
  border-radius: 50%;
`;
