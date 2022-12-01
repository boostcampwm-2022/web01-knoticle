import { atom } from 'recoil';

const scrapState = atom<any>({
  key: 'scrapState',
  default: [],
});

export default scrapState;
