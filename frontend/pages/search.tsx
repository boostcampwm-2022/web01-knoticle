import { RefObject, useEffect, useRef, useState } from 'react';

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
import useInput from '@hooks/useInput';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { IArticle, IBook } from '@interfaces';
import { PageInnerSmall, PageWrapper } from '@styles/layout';

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);

  const { data: newArticles, execute: searchArticles } = useFetch(searchArticlesApi);
  const { data: newBooks, execute: searchBooks } = useFetch(searchBooksApi);

  const keyword = useInput();
  const debouncedKeyword = useDebounce(keyword.value, 300);

  const target = useRef() as RefObject<HTMLDivElement>;
  const isIntersecting = useIntersectionObserver(target);

  const [articlePage, setArticlePage] = useState({ hasNextPage: true, pageNumber: 2 });
  const [bookPage, setBookPage] = useState({ hasNextPage: true, pageNumber: 2 });

  const [filter, setFilter] = useState({ type: 'article', userId: 0 });

  const highlightWord = (text: string, words: string[]): React.ReactNode => {
    let wordIndexList = words.map((word) => text.toLowerCase().indexOf(word.toLowerCase()));

    const filteredWords = words.filter((_, index) => wordIndexList[index] !== -1);
    wordIndexList = wordIndexList.filter((wordIndex) => wordIndex !== -1);

    if (wordIndexList.length === 0) return text;

    const startIndex = Math.min(...wordIndexList);

    const targetWord = filteredWords[wordIndexList.indexOf(startIndex)];

    const endIndex = startIndex + targetWord.length;

    return (
      <>
        {text.slice(0, startIndex)}
        <b>{text.slice(startIndex, endIndex)}</b>
        {highlightWord(text.slice(endIndex), words)}
      </>
    );
  };

  useEffect(() => {
    setArticles([]);
    setBooks([]);

    if (!debouncedKeyword) return;

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

    if (filter.type === 'article') {
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
    } else if (filter.type === 'book') {
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
    setArticles(
      articles.concat(
        newArticles.data.map((article: IArticle) => {
          const keywords = debouncedKeyword.trim().split(' ');

          return {
            ...article,
            title: highlightWord(article.title, keywords),
            content: highlightWord(article.content, keywords),
          };
        })
      )
    );
    setArticlePage({
      ...articlePage,
      hasNextPage: newArticles.hasNextPage,
    });
  }, [newArticles]);

  useEffect(() => {
    if (!newBooks) return;
    setBooks(
      books.concat(
        newBooks.data.map((book: IBook) => {
          const keywords = debouncedKeyword.trim().split(' ');

          return {
            ...book,
            title: highlightWord(book.title, keywords),
          };
        })
      )
    );
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
      <SearchHead />
      <GNB />
      <PageWrapper>
        <PageInnerSmall>
          <SearchBar {...keyword} />
          <SearchFilter handleFilter={handleFilter} />
          {articles?.length > 0 && filter.type === 'article' && <ArticleList articles={articles} />}
          {books?.length > 0 && filter.type === 'book' && <BookList books={books} />}
          {debouncedKeyword !== '' &&
            ((articles?.length === 0 && filter.type === 'article') ||
              (books?.length === 0 && filter.type === 'book')) && <SearchNoResult />}
          <div ref={target} />
        </PageInnerSmall>
      </PageWrapper>
    </>
  );
}
