import { useEffect, memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';

import update from 'immutability-helper';
import { useRecoilState } from 'recoil';

import scrapState from '@atoms/scrap';
import { IEditScrap } from '@interfaces';

import { ListItem } from '../ListItem';
import ContainerWapper from './styled';

const ItemTypes = {
  Scrap: 'scrap',
};

export interface ContainerState {
  data: IEditScrap[];
  isContentsShown: boolean;
  isDeleteBtnShown: boolean;
}
const DragContainer = memo(function Container({
  data,
  isContentsShown,
  isDeleteBtnShown,
}: ContainerState) {
  const [scraps, setScraps] = useRecoilState(scrapState);

  useEffect(() => {
    if (!data) return;
    setScraps(data);
  }, []);

  const findScrap = useCallback(
    (id: number) => {
      const scrap = scraps.filter((c) => c.article.id === id)[0];
      return {
        scrap,
        index: scraps.indexOf(scrap),
      };
    },
    [scraps]
  );

  const moveScrap = useCallback(
    (id: number, atIndex: number) => {
      const { scrap, index } = findScrap(id);
      setScraps(
        update(scraps, {
          $splice: [
            [index, 1],
            [atIndex, 0, scrap],
          ],
        })
      );
    },
    [findScrap, scraps, setScraps]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.Scrap }));
  return (
    <ContainerWapper ref={drop}>
      {scraps.map((scrap, index) => (
        <ListItem
          key={scrap.article.id}
          id={scrap.article.id}
          scrapId={scrap.id}
          text={scrap.article.title}
          isOriginal={scrap.is_original}
          moveScrap={moveScrap}
          findScrap={findScrap}
          isShown={index < 4}
          isContentsShown={isContentsShown}
          isDeleteBtnShown={isDeleteBtnShown}
        />
      ))}
    </ContainerWapper>
  );
});

export default DragContainer;
