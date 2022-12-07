import { atom } from 'recoil';

import { IEditScrap } from '@interfaces';

interface EditInfoState {
  deleted: number[];
  editted: {
    id: number;
    title: string;
    thumbnail_image: string;
    scraps: IEditScrap[];
  }[];
  deletedArticle: number[];
  deletedScraps: number[];
}

const editInfoState = atom<EditInfoState>({
  key: 'editInfoState',
  default: {
    deleted: [],
    editted: [],
    deletedArticle: [],
    deletedScraps: [],
  },
});

export default editInfoState;
