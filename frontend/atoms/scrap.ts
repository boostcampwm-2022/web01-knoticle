import { atom } from 'recoil';

const scrapState = atom({
  key: 'scrapState',
  default: [],
});

export default scrapState;
