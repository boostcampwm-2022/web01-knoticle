import Image from 'next/image';

import { useState } from 'react';

import CaretDownIcon from '../../../assets/ico_caret_down.svg';
import {
  DropdownWrapper,
  IconWrapper,
  Item,
  ItemWrapper,
  Placeholder,
  SelectedArea,
  SelectedItem,
} from './styled';

interface DropdownProps {
  label: string;
}

export default function Dropdown({ label }: DropdownProps) {
  const items = ['아이템1', '아이템2', '아이템3'];

  const [isShown, setShown] = useState(false);
  const [selection, setSelection] = useState('');

  const handleItemClick = (item: string) => {
    setSelection(item);
    setShown(false);
  };

  return (
    <DropdownWrapper>
      <SelectedArea onClick={() => setShown(!isShown)}>
        <IconWrapper className={isShown ? 'open' : 'close'}>
          <Image src={CaretDownIcon} alt="Caret Down Icon" />
        </IconWrapper>
        {selection ? <SelectedItem>{selection}</SelectedItem> : <Placeholder>{label}</Placeholder>}
      </SelectedArea>
      {isShown && (
        <ItemWrapper>
          {items.map((item) => (
            <Item key={item} onClick={() => handleItemClick(item)}>
              {item}
            </Item>
          ))}
        </ItemWrapper>
      )}
    </DropdownWrapper>
  );
}
