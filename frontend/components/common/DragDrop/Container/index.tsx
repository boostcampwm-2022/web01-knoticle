import { FC, useEffect, memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';

import update from 'immutability-helper';
import { useRecoilState } from 'recoil';

import scrapState from '@atoms/scrap';

import { ListItem } from '../ListItem';
import ContainerWapper from './styled';

const ItemTypes = {
  Scrap: 'scrap',
};

export interface ContainerState {
  scraps: any[];
}

export const Container: FC = memo(function Container({ data, isContentsShown }: any) {
  const [scraps, setScraps] = useRecoilState(scrapState);

  useEffect(() => {
    setScraps(data);
  }, []);

  const findScrap = useCallback(
    (id: string) => {
      const scrap = scraps.filter((c) => `${c.article.id}` === id)[0] as {
        order: number;
        article: any;
      };
      return {
        scrap,
        index: scraps.indexOf(scrap),
      };
    },
    [scraps]
  );

  const moveScrap = useCallback(
    (id: string, atIndex: number) => {
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
          id={`${scrap.article.id}`}
          text={scrap.article.title}
          moveScrap={moveScrap}
          findScrap={findScrap}
          isShown={index < 4}
          isContentsShown={isContentsShown}
        />
      ))}
    </ContainerWapper>
  );
});
