import GNB from '../components/common/GNB';
import SearchBar from '../components/Search/SearchBar';
import SearchFilter from '../components/Search/SearchFilter';
import { SearchArea } from '../components/Search/styled';

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
