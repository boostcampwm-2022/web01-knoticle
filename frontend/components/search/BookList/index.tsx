import Book from '@components/common/Book';
import { IBookScraps } from '@interfaces';

import { BookContainer, BookListWrapper } from './styled';

interface BookListProps {
  books: IBookScraps[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <BookListWrapper>
      {books.map((book) => (
        <BookContainer key={book.id}>
          <Book key={book.id} book={book} />
        </BookContainer>
      ))}
    </BookListWrapper>
  );
}
