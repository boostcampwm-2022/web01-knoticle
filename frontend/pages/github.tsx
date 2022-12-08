import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { githubSignInApi } from '@apis/authApi';
import signInStatusState from '@atoms/signInStatus';
import Spinner from '@components/common/Spinner';
import useFetch from '@hooks/useFetch';
import { FlexColumnCenter, FullPageWrapper } from '@styles/layout';
import { toastError } from '@utils/toast';

export default function Github() {
  const router = useRouter();

  const setSignInStatus = useSetRecoilState(signInStatusState);
  const { data: user, execute: githubSignIn } = useFetch(githubSignInApi);

  useEffect(() => {
    if (router.query.error) {
      toastError('GitHub 로그인에 실패했습니다.');

      router.push('/');
    }
  }, [router.query.error]);

  useEffect(() => {
    if (router.query.code) githubSignIn({ code: router.query.code });
  }, [router.query.code]);

  useEffect(() => {
    if (!user) return;

    setSignInStatus({ ...user });

    router.push('/');
  }, [user]);

  return (
    <FullPageWrapper>
      <FlexColumnCenter style={{ height: '100%', backgroundColor: 'var(--light-yellow-color)' }}>
        <Spinner style={{ width: 100, height: 100, borderWidth: 16 }} />
        <div style={{ marginTop: '32px' }}>GitHub 로그인 중 입니다.</div>
      </FlexColumnCenter>
    </FullPageWrapper>
  );
}
