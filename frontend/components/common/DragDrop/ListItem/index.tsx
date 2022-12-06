import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import MinusWhite from '@assets/ico_minus_white.svg';

import { Article, Text, MinusButton, MinusIcon } from './styled';

const ItemTypes = {
  Scrap: 'scrap',
};

export interface ScrapProps {
  id: string;
  text: string;
  moveScrap: (id: string, to: number) => void;
  findScrap: (id: string) => { index: number };
  isShown: boolean;
  isContentsShown: boolean;
  isDeleteBtnShown: boolean;
}

interface Item {
  id: string;
  originalIndex: number;
}

export const ListItem = memo(function Scrap({
  id,
  text,
  moveScrap,
  findScrap,
  isShown,
  isContentsShown,
  isDeleteBtnShown,
}: ScrapProps) {
  const originalIndex = findScrap(id).index;

  // Drag
  const [{ isDragging }, drag] = useDrag(
    () => ({
      // 타입설정 useDrop의 accept와 일치시켜야함
      type: ItemTypes.Scrap,
      item: { id, originalIndex },
      // Return array의 첫번째 값에 들어갈 객체를 정의한다.
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // 드래그가 끝났을때 실행한다.
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveScrap(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveScrap]
  );
  // Drop
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.Scrap,

      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findScrap(id);
          moveScrap(draggedId, overIndex);
        }
      },
    }),
    [findScrap, moveScrap]
  );

  const handleMinusBtnClick = () => {
    // 원본글이 아니면 스크랩에서만 삭제
    // 원본글이면 실제로 삭제
    if (confirm('글을 책에서 삭제하시겠습니까?')) {
      console.log('삭제!');
    } else {
      console.log(id);
    }
  };

  return (
    <Article ref={(node) => drag(drop(node))} isShown={isContentsShown ? true : isShown}>
      <Text>{text}</Text>
      {isDeleteBtnShown && (
        <MinusButton onClick={handleMinusBtnClick}>
          <MinusIcon src={MinusWhite} alt="글 삭제" />
        </MinusButton>
      )}
    </Article>
  );
});
