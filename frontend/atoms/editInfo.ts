import { atom } from 'recoil';

import { IScrap } from '@interfaces';

interface EditInfoState {
  deleted: number[];
  editted: {
    id: number;
    title: string;
    thumbnail_image: string;
    scraps: IScrap[];
  }[];
}

const editInfoState = atom<EditInfoState>({
  key: 'editInfoState',
  default: {
    deleted: [],
    editted: [],
  },
});

export default editInfoState;
