import { atom } from 'recoil';

import { IBookScraps } from '@interfaces';

const curBookmarkedBookListState = atom<IBookScraps[]>({
  key: 'curBookmarkedBookListState',
  default: [],
});

export default curBookmarkedBookListState;
