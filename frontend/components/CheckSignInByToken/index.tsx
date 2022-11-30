import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { checkSignInApi } from '@apis/authApi';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';

interface CheckSignInByTokenProps {
  children: React.ReactNode;
}

export default function CheckSignInByToken({ children }: CheckSignInByTokenProps) {
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

  return <div>{children}</div>;
}
