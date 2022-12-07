import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { githubSignInApi } from '@apis/authApi';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';
import { toastError } from '@utils/toast';

export default function Github() {
  const router = useRouter();
  const { data: user, execute: githubSignIn } = useFetch(githubSignInApi);
  const setSignInStatus = useSetRecoilState(signInStatusState);

  useEffect(() => {
    if (router.query.error) {
      toastError('깃헙 로그인 과정에서 에러가 발생했습니다.');
      router.push('/');
    }
  }, [router.query.error]);

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
