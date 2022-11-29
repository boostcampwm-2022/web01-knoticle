import SearchListItem from '@components/search/SearchListItem';

export default function ArticleList() {
  const items = Array.from({ length: 50 }, (_, i) => i);

  return (
    <>
      {items.map((item) => (
        <SearchListItem key={item} />
      ))}
    </>
  );
}
