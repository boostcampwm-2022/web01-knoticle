import Image from 'next/image';

import SearchIcon from '../../../assets/ico_search.svg';
import { SearchArea, SearchBarInput, SearchBarWrapper } from './styled';

export default function SearchBar() {
  return (
    <SearchArea>
      <SearchBarWrapper>
        <SearchBarInput />
        <Image src={SearchIcon} alt="Search Icon" />
      </SearchBarWrapper>
    </SearchArea>
  );
}
