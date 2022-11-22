import Book from '@components/common/Book';

import { BookGrid, BookListTabWrapper, TabTitle, TabTitleContent } from './styled';

export default function BookListTab() {
  const items = [1, 2, 3, 4, 5, 6, 7];

  return (
    <BookListTabWrapper>
      <TabTitle>
        <TabTitleContent>엮은 책</TabTitleContent>
        <TabTitleContent>북마크한 책</TabTitleContent>
      </TabTitle>
      <BookGrid>
        {items.map((item) => (
          <Book key={item} />
        ))}
      </BookGrid>
    </BookListTabWrapper>
  );
}
