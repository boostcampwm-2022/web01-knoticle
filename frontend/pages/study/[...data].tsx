import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
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
  const { data: updatedUserProfile, execute: updateUserProfile } = useFetch(updateUserProfileApi);
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);
  const [curUserProfile, setCurUserProfile] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditFinishBtnClick = () => {
    if (!curUserProfile) return;

    updateUserProfile(curUserProfile);
  };

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
    getUserProfile(nickname);
    getKnottedBookList(nickname);
    getBookmarkedBookList(nickname);
  }, [router.query.data]);

  useEffect(() => {
    if (!userProfile) return;

    setCurUserProfile({
      ...userProfile,
    });
  }, [userProfile]);

  useEffect(() => {
    if (updatedUserProfile === undefined || !curUserProfile) return;

    setIsEditing(false);
    setSignInStatus({
      ...signInStatus,
      nickname: curUserProfile.nickname,
    });
    window.history.replaceState(null, '', `/study/${curUserProfile.nickname}`);
  }, [updatedUserProfile]);

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
            <BookListTab
              knottedBookList={knottedBookList}
              bookmarkedBookList={bookmarkedBookList}
            />
            {signInStatus.id === curUserProfile.id && <FAB />}
          </PageInnerLarge>
        </PageWrapper>
      )}
    </>
  );
}
