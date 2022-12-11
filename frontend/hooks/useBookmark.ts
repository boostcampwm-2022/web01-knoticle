import { useCallback, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { postBookmarkApi, deleteBookmarkApi } from '@apis/bookmarkApi';
import signInStatusState from '@atoms/signInStatus';
import { toastError } from '@utils/toast';

import useFetch from './useFetch';

const useBookmark = (bookmarkId: number | null, bookmarkCnt: number, bookId: number) => {
  const signInStatus = useRecoilValue(signInStatusState);

  const [curBookmarkId, setCurBookmarkId] = useState<number | null>(bookmarkId);
  const [curBookmarkCnt, setCurBookmarkCnt] = useState(bookmarkCnt);

  const { data: postedBookmark, execute: postBookmark } = useFetch(postBookmarkApi);
  const { data: deletedBookmark, execute: deleteBookmark } = useFetch(deleteBookmarkApi);

  const handleBookmarkClick = useCallback(async () => {
    if (signInStatus.id === 0) {
      toastError('로그인이 필요합니다.');
      return;
    }

    if (curBookmarkId) {
      deleteBookmark({ bookmarkId: curBookmarkId });
    } else {
      postBookmark({ book_id: bookId });
    }
  }, [curBookmarkId]);

  // 북마크 등록 시
  useEffect(() => {
    if (!postedBookmark) return;
    setCurBookmarkId(postedBookmark.bookmarkId);
    setCurBookmarkCnt(curBookmarkCnt + 1);
  }, [postedBookmark]);

  // 북마크 해제 시
  useEffect(() => {
    if (!deletedBookmark) return;
    setCurBookmarkId(null);
    setCurBookmarkCnt(curBookmarkCnt - 1);
  }, [deletedBookmark]);

  return { handleBookmarkClick, curBookmarkCnt, curBookmarkId };
};

export default useBookmark;
