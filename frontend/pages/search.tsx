import { useEffect, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import { searchBooksApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleList from '@components/search/ArticleList';
import BookList from '@components/search/BookList';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import { PageInnerSmall, PageWrapper } from '@styles/layout';

export default function Search() {
  const { data: articles, execute: searchArticles } = useFetch(searchArticlesApi);
  const { data: books, execute: searchBooks } = useFetch(searchBooksApi);

  const keyword = useInput();
  const debouncedKeyword = useDebounce(keyword.value, 1000);

  const [filter, setFilter] = useState({ type: 'article', userId: 0 });

  useEffect(() => {
    if (!debouncedKeyword) return;

    if (filter.type === 'article') searchArticles({ query: debouncedKeyword, userId: 1, page: 1 });
    else if (filter.type === 'book') searchBooks({ query: debouncedKeyword, userId: 1, page: 1 });
  }, [debouncedKeyword]);

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
          <SearchBar {...keyword} />
          <SearchFilter handleFilter={handleFilter} />
          {articles?.length > 0 && filter.type === 'article' && <ArticleList articles={articles} />}
          {books?.length > 0 && filter.type === 'book' && <BookList />}
        </PageInnerSmall>
      </PageWrapper>
    </>
  );
}
