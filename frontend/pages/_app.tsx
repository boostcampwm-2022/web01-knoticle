import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import CheckSignInByToken from '@components/CheckSignInByToken';
import GlobalStyle from '@styles/GlobalStyle';
import responsive from '@styles/responsive';

import '@styles/font.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CheckSignInByToken>
        <GlobalStyle />
        <ThemeProvider theme={responsive}>
          <Component {...pageProps} />
          <ToastContainer limit={3} />
        </ThemeProvider>
      </CheckSignInByToken>
    </RecoilRoot>
  );
}
