import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { getUserProfileApi, updateUserProfileApi } from '@apis/userApi';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab';
import EditUserProfile from '@components/study/EditUserProfile';
import FAB from '@components/study/FAB';
import UserProfile from '@components/study/UserProfile';
import useFetch from '@hooks/useFetch';
import { IUser } from '@interfaces';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Study() {
  const router = useRouter();
  const { data: userProfile, execute: getUserProfile } = useFetch(getUserProfileApi);
  const { execute: updateUserProfile } = useFetch(updateUserProfileApi);
  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);
  const [curUserProfile, setCurUserProfile] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditFinishBtnClick = () => {
    if (!curUserProfile) return;

    setIsEditing(false);
    updateUserProfile(curUserProfile);
    setSignInStatus({
      ...signInStatus,
      nickname: curUserProfile.nickname,
    });
    window.history.pushState(null, '', `/study/${curUserProfile.nickname}`);
  };

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
    getUserProfile(nickname);
  }, [router.query.data]);

  useEffect(() => {
    if (!userProfile) return;

    setCurUserProfile({
      ...userProfile,
    });
  }, [userProfile]);

  return (
    <>
      <GNB />
      {curUserProfile && (
        <PageWrapper>
          <PageInnerLarge>
            {isEditing ? (
              <EditUserProfile
                handleEditFinishBtnClick={handleEditFinishBtnClick}
                curUserProfile={curUserProfile}
                setCurUserProfile={setCurUserProfile}
              />
            ) : (
              <UserProfile
                curUserProfile={curUserProfile}
                handleEditBtnClick={() => {
                  setIsEditing(true);
                }}
              />
            )}
            <BookListTab />
          </PageInnerLarge>
          <FAB />
        </PageWrapper>
      )}
    </>
  );
}
