import Image from 'next/image';

import SearchIcon from '../../../assets/ico_search.svg';
import { SearchBarInput, SearchBarWrapper } from './styled';

export default function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchBarInput />
      <Image src={SearchIcon} alt="Search Icon" />
    </SearchBarWrapper>
  );
}
