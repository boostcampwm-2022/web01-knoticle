import { useEffect, useState } from 'react';

import Book from '@components/common/Book';
import { IBookScraps } from '@interfaces';
import { highlightKeyword } from '@utils/highlight-keyword';

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

  useEffect(() => {
    setHighlightedBooks(
      books.map((book) => {
        return {
          ...book,
          title: highlightKeyword(book.title, keywords),
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
