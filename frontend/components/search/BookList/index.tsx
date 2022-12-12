import { useEffect, useState } from 'react';

import Book from '@components/common/Book';
import { IBookScraps } from '@interfaces';

import { BookContainer, BookListWrapper } from './styled';

interface BookListProps {
  books: IBookScraps[];
  keywords: string[];
}

interface HighlightedBooks extends Omit<IBookScraps, 'title'> {
  title: string | React.ReactNode;
}

export default function BookList({ books, keywords }: BookListProps) {
  const [highlightedBooks, setHighlightedBooks] = useState<HighlightedBooks[]>([]);

  const highlightWord = (text: string, words: string[], isFirst = false): React.ReactNode => {
    let wordIndexList = words.map((word) => text.toLowerCase().indexOf(word.toLowerCase()));

    const filteredWords = words.filter((_, index) => wordIndexList[index] !== -1);
    wordIndexList = wordIndexList.filter((wordIndex) => wordIndex !== -1);

    if (wordIndexList.length === 0) return text;

    const startIndex = Math.min(...wordIndexList);

    const targetWord = filteredWords[wordIndexList.indexOf(startIndex)];

    const endIndex = startIndex + targetWord.length;

    let paddingIndex = 0;

    if (isFirst) {
      const regex = /(<([^>]+)>)/g;

      while (regex.test(text.slice(0, startIndex))) paddingIndex = regex.lastIndex;
    }

    return (
      <>
        {text.slice(paddingIndex, startIndex)}
        <b>{text.slice(startIndex, endIndex)}</b>
        {highlightWord(text.slice(endIndex).replace(/(<([^>]+)>)/gi, ''), words)}
      </>
    );
  };

  useEffect(() => {
    setHighlightedBooks(
      books.map((book) => {
        return {
          ...book,
          title: highlightWord(book.title, keywords),
        };
      })
    );
  }, [books, keywords]);

  return (
    <BookListWrapper>
      {highlightedBooks.map((book: any) => (
        <BookContainer key={book.id}>
          <Book key={book.id} book={book} />
        </BookContainer>
      ))}
    </BookListWrapper>
  );
}
