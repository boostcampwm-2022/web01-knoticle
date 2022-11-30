import Image from 'next/image';

import { useState } from 'react';

import CaretDownIcon from '@assets/ico_caret_down.svg';

import {
  DropdownWrapper,
  IconWrapper,
  Item,
  ItemWrapper,
  Placeholder,
  SelectedArea,
  SelectedItem,
} from './styled';

interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  selectedId: number;
  handleItemSelect: (id: number) => void;
}

export default function Dropdown({ label, items, selectedId, handleItemSelect }: DropdownProps) {
  const [isDropdownSpread, setDropdownSpread] = useState(false);

  const handleItemClick = (itemId: number) => {
    setDropdownSpread(false);
    handleItemSelect(itemId);
  };

  return (
    <DropdownWrapper>
      <SelectedArea onClick={() => setDropdownSpread(!isDropdownSpread)}>
        <IconWrapper className={isDropdownSpread ? 'open' : 'close'}>
          <Image src={CaretDownIcon} alt="Caret Down Icon" />
        </IconWrapper>
        {selectedId !== -1 ? (
          <SelectedItem>{items.find((item) => item.id === selectedId)?.name}</SelectedItem>
        ) : (
          <Placeholder>{label}</Placeholder>
        )}
      </SelectedArea>
      {isDropdownSpread && (
        <ItemWrapper>
          {items.length === 0 && <Item onClick={() => setDropdownSpread(false)}>없음</Item>}

          {items.map((item) => (
            <Item key={item.id} onClick={() => handleItemClick(item.id)}>
              {item.name}
            </Item>
          ))}
        </ItemWrapper>
      )}
    </DropdownWrapper>
  );
}
