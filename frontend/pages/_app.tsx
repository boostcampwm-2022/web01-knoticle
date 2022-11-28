import type { AppProps } from 'next/app';

import { useEffect } from 'react';

import { RecoilRoot, useSetRecoilState } from 'recoil';

import { checkSignInApi } from '@apis/signInApi';
import signInStatusState from '@atoms/singInStatus';
import useFetch from '@hooks/useFetch';
import GlobalStyle from '@styles/GlobalStyle';

function CheckSignInByToken() {
  const { data: user, execute: checkSignIn } = useFetch(checkSignInApi);
  const setSignInStatus = useSetRecoilState(signInStatusState);

  useEffect(() => {
    checkSignIn();
  }, []);

  useEffect(() => {
    if (!user) return;

    setSignInStatus({
      ...user,
    });
  }, [user]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CheckSignInByToken />
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
