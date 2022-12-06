import { useEffect, useState } from 'react';

import { getOrderedBookListApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import GNB from '@components/common/GNB';
import HomeHead from '@components/home/HomeHead';
import Slider from '@components/home/Slider';
import useFetch from '@hooks/useFetch';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Home() {
  const { data: newestBookList, execute: getNewestBookList } = useFetch(getOrderedBookListApi);
  const { data: popularBookList, execute: getPopularBookList } = useFetch(getOrderedBookListApi);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getNewestBookList('newest');
    getPopularBookList('bookmark');
  }, []);

  useEffect(() => {
    if (!newestBookList || !popularBookList) return;

    setIsLoading(false);
  }, [newestBookList, popularBookList]);

  return (
    <>
      <HomeHead />
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          <Slider bookList={newestBookList} title="새로 엮은 책" isLoading={isLoading} />
          <Slider bookList={popularBookList} title="가장 인기 있는 책" isLoading={isLoading} />
          <Footer />
        </PageInnerLarge>
      </PageWrapper>
    </>
  );
}
