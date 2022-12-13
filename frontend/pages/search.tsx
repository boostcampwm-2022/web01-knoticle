import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import { searchBooksApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleList from '@components/search/ArticleList';
import BookList from '@components/search/BookList';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import SearchHead from '@components/search/SearchHead';
import SearchNoResult from '@components/search/SearchNoResult';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useSessionStorage from '@hooks/useSessionStorage';
import { PageInnerSmall, PageWrapperWithHeight } from '@styles/layout';

export default function Search() {
  const { value: articles, setValue: setArticles } = useSessionStorage('articles', []);
  const { value: books, setValue: setBooks } = useSessionStorage('books', []);

  const { data: newArticles, execute: searchArticles } = useFetch(searchArticlesApi);
  const { data: newBooks, execute: searchBooks } = useFetch(searchBooksApi);

  const { value: articlePage, setValue: setArticlePage } = useSessionStorage('articlePage', {
    hasNextPage: true,
    pageNumber: 2,
  });
  const { value: bookPage, setValue: setBookPage } = useSessionStorage('bookPage', {
    hasNextPage: true,
    pageNumber: 2,
  });

  const { value: filter, setValue: setFilter } = useSessionStorage('filter', {
    type: 'article',
    userId: 0,
  });

  const { value: keyword, setValue: setKeyword } = useSessionStorage('keyword', '');

  const debouncedKeyword = useDebounce(keyword, 300);
  const [keywords, setKeywords] = useState<string[]>([]);

  const target = useRef() as RefObject<HTMLDivElement>;
  const isIntersecting = useIntersectionObserver(target);

  const [isInitialRendering, setIsInitialRendering] = useState(true);

  const [isArticleNoResult, setIsArticleNoResult] = useState(false);
  const [isBookNoResult, setIsBookNoResult] = useState(false);

  const { setValue: setScrollTop } = useSessionStorage('scroll', 0);
  const [initialHeight, setInitialHeight] = useState(0);

  useEffect(() => {
    setKeywords(
      debouncedKeyword
        .trim()
        .split(' ')
        .filter((word: string) => word)
    );
  }, [debouncedKeyword]);

  useEffect(() => {
    if (isInitialRendering) return;

    if (debouncedKeyword === '') {
      setArticles([]);
      setBooks([]);
      setIsArticleNoResult(false);
      setIsBookNoResult(false);
      setArticlePage({
        hasNextPage: true,
        pageNumber: 2,
      });
      setBookPage({
        hasNextPage: true,
        pageNumber: 2,
      });
      return;
    }

    searchArticles({
      query: debouncedKeyword,
      userId: filter.userId,
      page: 1,
      take: 12,
    });
    setArticlePage({
      hasNextPage: true,
      pageNumber: 2,
    });

    searchBooks({
      query: debouncedKeyword,
      userId: filter.userId,
      page: 1,
      take: 12,
    });
    setBookPage({
      hasNextPage: true,
      pageNumber: 2,
    });
  }, [debouncedKeyword, filter.userId]);

  useEffect(() => {
    if (!isIntersecting || !debouncedKeyword) return;

    if (filter.type === 'article' && !isArticleNoResult) {
      if (!articlePage.hasNextPage) return;
      searchArticles({
        query: debouncedKeyword,
        userId: filter.userId,
        page: articlePage.pageNumber,
        take: 12,
      });
      setArticlePage({
        ...articlePage,
        pageNumber: articlePage.pageNumber + 1,
      });
    } else if (filter.type === 'book' && !isBookNoResult) {
      if (!bookPage.hasNextPage) return;
      searchBooks({
        query: debouncedKeyword,
        userId: filter.userId,
        page: bookPage.pageNumber,
        take: 12,
      });
      setBookPage({
        ...bookPage,
        pageNumber: bookPage.pageNumber + 1,
      });
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (!newArticles) return;

    if (newArticles.data.length === 0 && articlePage.pageNumber === 2) {
      setArticles([]);
      setIsArticleNoResult(true);
      return;
    }

    setIsArticleNoResult(false);

    if (articlePage.pageNumber === 2) setArticles(newArticles.data);
    else setArticles(articles.concat(newArticles.data));

    setArticlePage({
      ...articlePage,
      hasNextPage: newArticles.hasNextPage,
    });
  }, [newArticles]);

  useEffect(() => {
    if (!newBooks) return;

    if (newBooks.data.length === 0 && bookPage.pageNumber === 2) {
      setBooks([]);
      setIsBookNoResult(true);
      return;
    }

    setIsBookNoResult(false);

    if (bookPage.pageNumber === 2) setBooks(newBooks.data);
    else setBooks(books.concat(newBooks.data));

    setBookPage({
      ...bookPage,
      hasNextPage: newBooks.hasNextPage,
    });
  }, [newBooks]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollTop(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFilter = (value: { [value: string]: string | number }) => {
    setFilter({
      ...filter,
      ...value,
    });
    if (initialHeight !== 0) setInitialHeight(0);
  };

  const handleKeywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInitialRendering(false);
    if (e.target) setKeyword(e.target.value);
  };

  useEffect(() => {
    setInitialHeight(Number(sessionStorage.getItem('scroll')));
  }, []);

  useEffect(() => {
    if (initialHeight !== 0) window.scrollTo(0, initialHeight);
  }, [initialHeight]);

  return (
    <>
      <SearchHead />
      <GNB />
      <PageWrapperWithHeight initialHeight={initialHeight}>
        <PageInnerSmall>
          <SearchBar onChange={handleKeywordOnChange} value={keyword} />
          <SearchFilter filter={filter} handleFilter={handleFilter} />
          {debouncedKeyword !== '' &&
            filter.type === 'article' &&
            (isArticleNoResult ? (
              <SearchNoResult />
            ) : (
              <ArticleList articles={articles} keywords={keywords} />
            ))}
          {debouncedKeyword !== '' &&
            filter.type === 'book' &&
            (isBookNoResult ? <SearchNoResult /> : <BookList books={books} keywords={keywords} />)}
          <div ref={target} />
        </PageInnerSmall>
      </PageWrapperWithHeight>
    </>
  );
}
