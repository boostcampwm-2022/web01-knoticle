import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import { updateUserProfileApi } from '@apis/userApi';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab';
import EditUserProfile from '@components/study/EditUserProfile';
import StudyHead from '@components/study/StudyHead';
import UserProfile from '@components/study/UserProfile';
import useFetch from '@hooks/useFetch';
import { IUser } from '@interfaces';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

interface StudyProps {
  userProfile: {
    id: number;
    profile_image: string;
    nickname: string;
    description: string;
  };
}

export default function Study({ userProfile }: StudyProps) {
  const router = useRouter();

  const { data: updatedUserProfile, execute: updateUserProfile } = useFetch(updateUserProfileApi);
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);
  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);

  const [curUserProfile, setCurUserProfile] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditFinishBtnClick = () => {
    if (!curUserProfile) return;

    updateUserProfile(curUserProfile);
  };

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
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

  useEffect(() => {
    if (!knottedBookList) return;

    setCurKnottedBookList(knottedBookList);
  }, [knottedBookList]);

  return (
    <>
      <StudyHead
        userNickname={userProfile.nickname}
        userDescription={userProfile.description}
        userImage={userProfile.profile_image}
      />
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
              knottedBookList={curKnottedBookList}
              bookmarkedBookList={bookmarkedBookList}
              isUserMatched={signInStatus.id === curUserProfile.id}
            />
          </PageInnerLarge>
        </PageWrapper>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nickname = context.query.data;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users?nickname=${nickname}`
  );
  const { data } = response;

  return { props: { userProfile: data } };
};
