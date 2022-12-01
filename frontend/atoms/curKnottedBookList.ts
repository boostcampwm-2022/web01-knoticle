import { atom } from 'recoil';

import { IBookScraps } from '@interfaces';

const curKnottedBookListState = atom<IBookScraps[]>({
  key: 'curKnottedBookListState',
  default: [],
});

export default curKnottedBookListState;
