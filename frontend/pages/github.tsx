import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { githubSingInApi } from '@apis/signInApi';
import useFetch from '@hooks/useFetch';

export default function Github() {
  const router = useRouter();
  const { data: user, execute: githubSignIn } = useFetch(githubSingInApi);

  useEffect(() => {
    if (router.query.code) {
      githubSignIn({
        code: router.query.code,
      });
    }
  }, [router.query.code]);

  useEffect(() => {
    router.push('/');
  }, [user]);

  return <div>Github 로그인 시동 중입니다.....</div>;
}
