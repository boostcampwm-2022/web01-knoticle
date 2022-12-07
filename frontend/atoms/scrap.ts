import { atom } from 'recoil';

import { IScrap } from '@interfaces';

const scrapState = atom<IScrap[]>({
  key: 'scrapState',
  default: [],
});

export default scrapState;
