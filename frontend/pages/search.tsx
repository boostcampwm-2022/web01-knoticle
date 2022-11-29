import { useEffect, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import { searchBooksApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import SearchListItem from '@components/search/SearchListItem';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import { PageInnerSmall, PageWrapper } from '@styles/layout';

export default function Search() {
  const items = Array.from({ length: 50 }, (_, i) => i);

  const { data: articles, execute: searchArticles } = useFetch(searchArticlesApi);
  const { data: books, execute: searchBooks } = useFetch(searchBooksApi);

  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({ type: 'article', userId: 0 });
  const debouncedKeyword = useDebounce(keyword, 1000);

  const handleSearchbarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // 데이터 받아오기
  }, [debouncedKeyword]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const handleFilter = (value: { [value: string]: string | number }) => {
    setFilter({
      ...filter,
      ...value,
    });
  };

  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerSmall>
          <SearchBar handleSearchbarOnChange={handleSearchbarOnChange} />
          <SearchFilter handleFilter={handleFilter} />
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
