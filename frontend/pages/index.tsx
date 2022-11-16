import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TempWrapper = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
`;

export default function AAA() {
  return (
    <Page>
      <TempWrapper>Login</TempWrapper>
    </Page>
  );
}
