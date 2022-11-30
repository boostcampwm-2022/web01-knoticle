import { RefObject, useEffect, useRef, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import { searchBooksApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleList from '@components/search/ArticleList';
import BookList from '@components/search/BookList';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { PageInnerSmall, PageWrapper } from '@styles/layout';

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);

  const { data: newArticles, execute: searchArticles } = useFetch(searchArticlesApi);
  const { data: newBooks, execute: searchBooks } = useFetch(searchBooksApi);

  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({ type: 'article', userId: 0 });
  const debouncedKeyword = useDebounce(keyword, 1000);

  const target = useRef() as RefObject<HTMLDivElement>;
  const isIntersecting = useIntersectionObserver(target);

  const [articlePage, setArticlePage] = useState({ hasNextPage: true, pageNumber: 2 });
  const [bookPage, setBookPage] = useState({ hasNextPage: true, pageNumber: 2 });

  const handleSearchbarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (!debouncedKeyword) return;

    setArticles([]);
    searchArticles({ query: debouncedKeyword, userId: filter.userId, page: 1 });
    setArticlePage({
      hasNextPage: true,
      pageNumber: 2,
    });
    setBooks([]);
    searchBooks({ query: debouncedKeyword, userId: filter.userId, page: 1 });
    setBookPage({
      hasNextPage: true,
      pageNumber: 2,
    });
  }, [debouncedKeyword, filter.userId]);

  useEffect(() => {
    if (!isIntersecting || !debouncedKeyword) return;

    if (filter.type === 'article') {
      if (!articlePage.hasNextPage) return;
      searchArticles({
        query: debouncedKeyword,
        userId: filter.userId,
        page: articlePage.pageNumber,
      });
      setArticlePage({
        ...articlePage,
        pageNumber: articlePage.pageNumber + 1,
      });
    } else if (filter.type === 'book') {
      if (!bookPage.hasNextPage) return;
      searchBooks({ query: debouncedKeyword, userId: filter.userId, page: bookPage.pageNumber });
      setBookPage({
        ...bookPage,
        pageNumber: bookPage.pageNumber + 1,
      });
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (!newArticles) return;
    setArticles(articles.concat(newArticles.data));
    setArticlePage({
      ...articlePage,
      hasNextPage: newArticles.hasNextPage,
    });
  }, [newArticles]);

  useEffect(() => {
    if (!newBooks) return;
    setBooks(books.concat(newBooks.data));
    setBookPage({
      ...bookPage,
      hasNextPage: newBooks.hasNextPage,
    });
  }, [newBooks]);

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
          {articles?.length > 0 && filter.type === 'article' && <ArticleList articles={articles} />}
          {books?.length > 0 && filter.type === 'book' && <BookList books={books} />}
          <div ref={target} />
        </PageInnerSmall>
      </PageWrapper>
    </>
  );
}
