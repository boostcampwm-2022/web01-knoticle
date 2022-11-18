import { useRouter } from 'next/router';

import { useEffect } from 'react';

import axios from 'axios';

export default function Github() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin/github`,
          {
            code: router.query.code,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          router.push('/');
        });
    }
  });

  return <div>Github 로그인 시동 중입니다.....</div>;
}
