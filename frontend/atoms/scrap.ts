import { atom } from 'recoil';

import { IEditScrap } from '@interfaces';

const scrapState = atom<IEditScrap[]>({
  key: 'scrapState',
  default: [],
});

export default scrapState;
