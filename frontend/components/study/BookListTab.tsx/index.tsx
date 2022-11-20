import { BookGrid, BookListTabWrapper, LeftTab, RightTab, TabTitle, TempBook } from './styled';

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
          <TempBook key={item}>{item}</TempBook>
        ))}
      </BookGrid>
    </BookListTabWrapper>
  );
}
