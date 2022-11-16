import Image from 'next/image';

import { useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import GithubIcon from '../assets/icon-github.svg';
import Button from '../components/common/Button';
import InputWithLabel from '../components/SignInModal/InputWithLabel';
import ModalTitle from '../components/SignInModal/ModalTitle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--light-orange-color);
  border-radius: 30px;
  height: 100%;
`;

const SinginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setInfo({
      ...info,
      [key]: e.target.value,
    });
  };

  const SERVER_URL = 'http://localhost:8000';
  const handleOnClick = () => {
    axios
      .post(`${SERVER_URL}/api/auth/signin/local`, {
        username: info.username,
        password: info.password,
      })
      .then((res) =>
        // 응답으로 받아온 로그인 정보를 이용해 전역 상태 관리!!
        console.log(res)
      );
  };

  return (
    <Wrapper>
      <ModalTitle title="Knoticle 시작하기" />
      <SinginForm>
        <InputWithLabel
          title="아이디"
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => {
            handleInputChange(e, 'username');
          }}
        />
        <InputWithLabel
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            handleInputChange(e, 'password');
          }}
        />
        <Button title="로그인하기" onClick={handleOnClick} />
      </SinginForm>
      <GithubBtn onClick={() => console.log(info)}>
        <Image src={GithubIcon} alt="Github Icon" />
        Github으로 로그인하기
      </GithubBtn>
    </Wrapper>
  );
}
