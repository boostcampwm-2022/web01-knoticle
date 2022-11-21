import styled from 'styled-components';

import { Flex } from '@styles/layout';

export const TOCBox = styled(Flex)`
  /* 고정크기? %? */
  min-width: 250px;
  height: calc(100vh - 66px);
  background-color: var(--primary-color);
  color: var(--white-color);
  flex-direction: column;
`;

export const TOCsideBar = styled.div`
  padding: 30px;
  flex-basis: 90%;
`;

export const TOCIcons = styled(Flex)`
  justify-content: space-between;
`;

export const TOCtitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--white-color);
`;
export const TOCcontainer = styled.div`
  background-color: var(--white-color);
  height: 70%;
  color: var(--grey-01-color);
  border-radius: 20px;
  padding: 20px;
  margin-top: 10px;
  overflow: auto;
`;
export const TOClist = styled.div`
  margin: 5px;
`;

export const TOCproflie = styled(Flex)`
  justify-content: end;
  align-items: end;
  flex-basis: 10%;
  padding: 20px;
`;
export const TOCproflieText = styled(Flex)`
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding-left: 10px;
`;

export const TOCImgBox = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  margin-left: 10px;
  border-radius: 50%;
`;
