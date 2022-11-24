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

  console.log(newestBookList);

  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          <Slider bookList={!newestBookList ? [] : newestBookList} />
          <Slider bookList={!popularBookList ? [] : popularBookList} />
          <Footer />
        </PageInnerLarge>
      </PageWrapper>
    </>
  );
}
