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
  const [isShown, setShown] = useState(false);

  const handleItemClick = (itemId: number) => {
    setShown(false);
    handleItemSelect(itemId);
  };

  return (
    <DropdownWrapper>
      <SelectedArea onClick={() => setShown(!isShown)}>
        <IconWrapper className={isShown ? 'open' : 'close'}>
          <Image src={CaretDownIcon} alt="Caret Down Icon" />
        </IconWrapper>
        {selectedId !== -1 ? (
          <SelectedItem>{items.find((item) => item.id === selectedId)?.name}</SelectedItem>
        ) : (
          <Placeholder>{label}</Placeholder>
        )}
      </SelectedArea>
      {isShown && (
        <ItemWrapper>
          {items.length === 0 && <Item onClick={() => setShown(false)}>없음</Item>}

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
