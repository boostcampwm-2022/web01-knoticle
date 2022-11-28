import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';

import GlobalStyle from '@styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer limit={3} />
    </RecoilRoot>
  );
}
