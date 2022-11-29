import Image from 'next/image';

import SearchIcon from '@assets/ico_search.svg';

import { SearchBarInput, SearchBarWrapper } from './styled';

interface SearchBarProps {
  handleSearchbarOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ handleSearchbarOnChange }: SearchBarProps) {
  return (
    <SearchBarWrapper>
      <SearchBarInput onChange={handleSearchbarOnChange} />
      <Image src={SearchIcon} alt="Search Icon" />
    </SearchBarWrapper>
  );
}
