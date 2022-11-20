import GNB from '../components/common/GNB';
import SearchBar from '../components/search/SearchBar';
import SearchFilter from '../components/search/SearchFilter';
import { SearchArea } from '../components/search/styled';

export default function Search() {
  return (
    <>
      <GNB />
      <SearchArea>
        <SearchBar />
        <SearchFilter />
      </SearchArea>
    </>
  );
}
