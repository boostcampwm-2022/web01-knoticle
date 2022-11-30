import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { githubSignInApi } from '@apis/authApi';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';

export default function Github() {
  const router = useRouter();
  const { data: user, execute: githubSignIn } = useFetch(githubSignInApi);
  const setSignInStatus = useSetRecoilState(signInStatusState);

  useEffect(() => {
    if (router.query.code) {
      githubSignIn({
        code: router.query.code,
      });
    }
  }, [router.query.code]);

  useEffect(() => {
    if (!user) return;

    setSignInStatus({
      ...user,
    });
    router.push('/');
  }, [user]);

  return <div>Github 로그인 시동 중입니다.....</div>;
}
