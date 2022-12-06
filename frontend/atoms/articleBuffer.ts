import { atom } from 'recoil';

const articleBuffer = atom({
  key: 'articleBuffer',
  default: {
    title: '',
    content: '',
  },
});

export default articleBuffer;
