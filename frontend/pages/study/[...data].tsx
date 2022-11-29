import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { getUserProfileApi } from '@apis/userApi';
import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab';
import FAB from '@components/study/FAB';
import UserProfile from '@components/study/UserProfile';
import useFetch from '@hooks/useFetch';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Study() {
  const router = useRouter();
  const { data: userProfile, execute: getUserProfile } = useFetch(getUserProfileApi);

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
    getUserProfile(nickname);
  }, [router.query.data]);

  return (
    <>
      <GNB />
      {userProfile && (
        <PageWrapper>
          <PageInnerLarge>
            <UserProfile userProfile={userProfile} />
            <BookListTab />
          </PageInnerLarge>
          <FAB />
        </PageWrapper>
      )}
    </>
  );
}
