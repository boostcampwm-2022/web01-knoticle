import { FilterButton, FilterGroup, FilterLabel, FilterWrapper } from './styled';

export default function SearchFilter() {
  return (
    <FilterWrapper>
      <FilterGroup>
        <FilterLabel>
          <FilterButton type="radio" name="type" />글
        </FilterLabel>
        <FilterLabel>
          <FilterButton type="radio" name="type" />책
        </FilterLabel>
      </FilterGroup>
      <FilterLabel>
        <FilterButton type="checkbox" />내 책에서 검색
      </FilterLabel>
    </FilterWrapper>
  );
}
