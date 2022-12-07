import { atom } from 'recoil';

import { IEditBookScraps } from '@interfaces';

const curKnottedBookListState = atom<IEditBookScraps[]>({
  key: 'curKnottedBookListState',
  default: [],
});

export default curKnottedBookListState;
