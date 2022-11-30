import type { FC } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import Article from './styled';

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
}: ScrapProps) {
  const originalIndex = findScrap(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Scrap,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveScrap(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveScrap]
  );

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

  return (
    <Article ref={(node) => drag(drop(node))} isShown={isContentsShown ? true : isShown}>
      {text}
    </Article>
  );
});
