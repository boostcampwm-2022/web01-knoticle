import styled from 'styled-components';

import SignInModal from '../layouts/SignInModal';

const Page = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TempWrapper = styled.div`
  width: 40vw;
  height: 60vh;
`;

export default function AAA() {
  return (
    <Page>
      <TempWrapper>
        <SignInModal />
      </TempWrapper>
    </Page>
  );
}
