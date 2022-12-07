import { useEffect, memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';

import update from 'immutability-helper';
import { useRecoilState } from 'recoil';

import scrapState from '@atoms/scrap';
import { IScrap } from '@interfaces';

import { ListItem } from '../ListItem';
import ContainerWapper from './styled';

const ItemTypes = {
  Scrap: 'scrap',
};

export interface EditScrap {
  id: number;
  order: number;
  article: {
    id: number;
    title: string;
  };
}
export interface ContainerState {
  data: IScrap[];
  isContentsShown: boolean;
}

export const Container = memo(function Container({ data, isContentsShown }: ContainerState) {
  const [scraps, setScraps] = useRecoilState(scrapState);

  useEffect(() => {
    if (!data) return;
    setScraps(data);
  }, []);

  const findScrap = useCallback(
    (id: string) => {
      const scrap = scraps.filter((c) => `${c.article.id}` === id)[0];
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
