import Image from 'next/image';

import { useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import GithubIcon from '../../assets/ico_github.svg';
import LabeledInput from '../common/LabeledInput';
import Button from '../common/Modal/ModalButton';

const SignInModalWrapper = styled.div`
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
`;

const GithubBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SignInModal() {
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const SERVER_URL = 'http://localhost:8000';
  const handleSignInBtnOnClick = () => {
    axios
      .post(
        `${SERVER_URL}/api/auth/signin/local`,
        {
          username: info.username,
          password: info.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        // 응답으로 받아온 로그인 정보를 이용해 전역 상태 관리!!
        console.log(res)
      );
  };

  return (
    <SignInModalWrapper>
      <LabeledInput
        label="아이디"
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요"
        onChange={handleInputChange}
      />
      <LabeledInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInputChange}
      />
      <Button theme="primary" onClick={handleSignInBtnOnClick}>
        로그인하기
      </Button>
      <Button theme="second" onClick={() => console.log('asd')}>
        <Image src={GithubIcon} alt="Github Icon" />
        Github으로 로그인하기
      </Button>
      {/* <GithubBtn onClick={() => console.log(info)}>
        
      </GithubBtn> */}
    </SignInModalWrapper>
  );
}
