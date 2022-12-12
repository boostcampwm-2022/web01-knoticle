import { useRecoilValue } from 'recoil';

import signInStatusState from '@atoms/signInStatus';

import { FilterButton, FilterGroup, FilterLabel, FilterWrapper } from './styled';

interface SearchFilterProps {
  handleFilter: (value: { [value: string]: string | number }) => void;
}

export default function SearchFilter({ handleFilter }: SearchFilterProps) {
  const signInStatus = useRecoilValue(signInStatusState);

  return (
    <FilterWrapper>
      <FilterGroup>
        <FilterLabel>
          <FilterButton
            type="radio"
            name="type"
            onChange={() => handleFilter({ type: 'article' })}
            defaultChecked
          />
          글
        </FilterLabel>
        <FilterLabel>
          <FilterButton type="radio" name="type" onChange={() => handleFilter({ type: 'book' })} />
          책
        </FilterLabel>
      </FilterGroup>
      {signInStatus.id !== 0 && (
        <FilterLabel>
          <FilterButton
            type="checkbox"
            onChange={(e) => handleFilter({ isUsers: e.target.checked ? 1 : 0 })}
          />
          내 책에서 검색
        </FilterLabel>
      )}
    </FilterWrapper>
  );
}
