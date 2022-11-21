import GNB from '../components/common/GNB';
import SearchBar from '../components/search/SearchBar';
import SearchFilter from '../components/search/SearchFilter';
import SearchListItem from '../components/search/SearchListItem';
import { SearchArea, SearchResult, SearchWrapper } from '../components/search/styled';

export default function Search() {
  const items = Array.from({ length: 50 });

  return (
    <>
      <GNB />
      <SearchWrapper>
        <SearchArea>
          <SearchBar />
          <SearchFilter />
          <SearchResult>
            {items.map((_, index) => (
              <SearchListItem key={index} />
            ))}
          </SearchResult>
        </SearchArea>
      </SearchWrapper>
    </>
  );
}
