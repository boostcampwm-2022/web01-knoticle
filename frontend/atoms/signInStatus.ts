import { atom } from 'recoil';

const signInStatusState = atom({
  key: 'signInStatusState',
  default: {
    id: 0,
    nickname: '',
  },
});

export default signInStatusState;
