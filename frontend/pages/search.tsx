import { useEffect, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import GNB from '@components/common/GNB';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import SearchListItem from '@components/search/SearchListItem';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import { PageInnerSmall, PageWrapper } from '@styles/layout';

export default function Search() {
  const items = Array.from({ length: 50 }, () => 0);

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 1000);

  const handleSearchbarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // 데이터 받아오기
  }, [debouncedKeyword]);

  const { data: articles, execute: searchArticles } = useFetch(searchArticlesApi);

  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerSmall>
          <SearchBar handleSearchbarOnChange={handleSearchbarOnChange} />
          <SearchFilter />
          <div>
            {items.map((item) => (
              <SearchListItem key={item} />
            ))}
          </div>
        </PageInnerSmall>
      </PageWrapper>
    </>
  );
}
