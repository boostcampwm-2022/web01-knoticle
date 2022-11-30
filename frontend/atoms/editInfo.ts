import { atom } from 'recoil';

interface EditInfoState {
  deleted: number[];
}

const editInfoState = atom<EditInfoState>({
  key: 'editInfoState',
  default: {
    deleted: [],
  },
});

export default editInfoState;
