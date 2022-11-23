import { useState } from 'react';

import LabeledInput from '@components/common/LabeledInput';
import Button from '@components/common/Modal/ModalButton';
import axios from 'axios';

import { SignUpModalWrapper, SignUpModalErrorMessage } from './styled';

interface SignUpModalProps {
  handleModalClose: () => void;
}

function SignUpModal({ handleModalClose }: SignUpModalProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [info, setInfo] = useState({
    username: '',
    password: '',
    nickname: '',
  });

  const checkUsernameValid = (username: string) => {
    if (/[^a-zA-Z0-9]/.test(username) || username.length > 10) {
      setErrorMessage('아이디가 형식에 맞지 않습니다.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const checkInputsValid = () => {
    if (checkUsernameValid(info.username) && info.password && info.nickname) {
      setIsInputValid(true);
    } else setIsInputValid(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    checkInputsValid();
  };

  const handleSignUpBtnClick = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, info)
      .then(() => {
        handleModalClose();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <SignUpModalWrapper>
      <SignUpModalErrorMessage>{errorMessage}</SignUpModalErrorMessage>
      <LabeledInput
        label="아이디"
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요(영문, 숫자 조합 10자 이내)"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="닉네임"
        type="text"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        onChange={handleInputChange}
      />
      <Button theme="primary" onClick={handleSignUpBtnClick} disabled={!isInputValid}>
        회원가입하기
      </Button>
    </SignUpModalWrapper>
  );
}

export default SignUpModal;
