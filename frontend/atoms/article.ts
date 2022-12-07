import { atom } from 'recoil';

const articleState = atom({
  key: 'articleState',
  default: {
    id: -1,
    title: '',
    content: '',
    book_id: -1,
  },
});

export default articleState;
