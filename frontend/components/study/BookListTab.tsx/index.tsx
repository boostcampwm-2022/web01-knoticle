import Book from '../../common/Book';
import { BookGrid, BookListTabWrapper, LeftTab, RightTab, TabTitle } from './styled';

export default function BookListTab() {
  const items = [1, 2, 3, 4, 5, 6, 7];

  return (
    <BookListTabWrapper>
      <TabTitle>
        <LeftTab>엮은 책</LeftTab>
        <RightTab>북마크한 책</RightTab>
      </TabTitle>
      <BookGrid>
        {items.map((item) => (
          <Book key={item} />
        ))}
      </BookGrid>
    </BookListTabWrapper>
  );
}
