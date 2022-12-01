import Image from 'next/image';

import SearchIcon from '@assets/ico_search.svg';

import { SearchBarInput, SearchBarWrapper } from './styled';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <SearchBarWrapper>
      <SearchBarInput value={value} onChange={onChange} placeholder="검색어를 입력해주세요." />
      <Image src={SearchIcon} alt="Search Icon" />
    </SearchBarWrapper>
  );
}
