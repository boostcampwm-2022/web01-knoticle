import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import CheckSignInByToken from '@components/CheckSignInByToken';
import GlobalStyle from '@styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CheckSignInByToken>
        <GlobalStyle />
        <Component {...pageProps} />
      </CheckSignInByToken>
    </RecoilRoot>
  );
}
