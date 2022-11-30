import { FilterButton, FilterGroup, FilterLabel, FilterWrapper } from './styled';

interface SearchFilterProps {
  handleFilter: (value: { [value: string]: string | number }) => void;
}

export default function SearchFilter({ handleFilter }: SearchFilterProps) {
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
      <FilterLabel>
        <FilterButton
          type="checkbox"
          onChange={(e) => handleFilter({ userId: e.target.checked ? 1 : 0 })}
        />
        내 책에서 검색
      </FilterLabel>
    </FilterWrapper>
  );
}
