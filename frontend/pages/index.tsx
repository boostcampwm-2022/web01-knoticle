import { useEffect } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import GNB from '@components/common/GNB';
import Slider from '@components/home/Slider';
import useFetch from '@hooks/useFetch';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Home() {
  const { data: newestBookList, execute: getNewestBookList } = useFetch(getOrderedBookListApi);
  const { data: popularBookList, execute: getPopularBookList } = useFetch(getOrderedBookListApi);

  useEffect(() => {
    getNewestBookList('newest');
    getPopularBookList('bookmark');
  }, []);

  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          <Slider bookList={!newestBookList ? [] : newestBookList} title="새로 엮은 책" />
          <Slider bookList={!popularBookList ? [] : popularBookList} title="가장 인기 있는 책" />
          <Footer />
        </PageInnerLarge>
      </PageWrapper>
    </>
  );
}
