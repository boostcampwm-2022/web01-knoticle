import { useCallback, useEffect, useState } from 'react';

import { postBookmarkApi, deleteBookmarkApi } from '@apis/bookmarkApi';

import useFetch from './useFetch';

const useBookmark = (bookmarkId: number | null, bookmarkCnt: number, bookId: number) => {
  const [curBookmarkId, setCurBookmarkId] = useState<number | null>(bookmarkId);
  const [curBookmarkCnt, setCurBookmarkCnt] = useState(bookmarkCnt);

  const { execute: deleteBookmark } = useFetch(deleteBookmarkApi);
  const { data: postedBookmark, execute: postBookmark } = useFetch(postBookmarkApi);

  useEffect(() => {
    if (!postedBookmark) return;
    setCurBookmarkId(postedBookmark.bookmarkId);
    setCurBookmarkCnt(curBookmarkCnt + 1);
  }, [postedBookmark]);

  const handleBookmarkClick = useCallback(async () => {
    if (curBookmarkId) {
      await deleteBookmark({ bookmarkId: curBookmarkId });
      setCurBookmarkId(null);
      setCurBookmarkCnt(curBookmarkCnt - 1);
    } else {
      await postBookmark({ book_id: bookId });
    }
  }, [curBookmarkId]);

  return { handleBookmarkClick, curBookmarkCnt, curBookmarkId };
};

export default useBookmark;
