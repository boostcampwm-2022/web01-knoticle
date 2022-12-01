import { atom } from 'recoil';

const articleState = atom({
  key: 'articleState',
  default: {
    title: '',
    content: '',
    book_id: -1,
  },
});

export default articleState;
