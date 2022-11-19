import styled from 'styled-components';

export const TOCBox = styled.nav`
  width: 30%;
  height: 100%;
  background-color: var(--primary-color);
  color: var(--white-color);
`;

export const TOCsideBar = styled.div`
  width: 300;
  padding: 30px;
`;

export const TOCIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TOCtitle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--white-color);
`;
export const TOCcontainer = styled.div`
  background-color: var(--white-color);
  height: 400px;
  color: var(--grey-01-color);
`;
export const TOClist = styled.div`
  margin: 5px;
`;

export const TOCproflie = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 30px 0;
`;
export const TOCproflieText = styled.div`
  display: flex;
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
