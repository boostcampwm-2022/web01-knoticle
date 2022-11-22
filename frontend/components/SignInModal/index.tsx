import Image from 'next/image';

import { useState } from 'react';

import GithubIcon from '@assets/ico_github.svg';
import LabeledInput from '@components/common/LabeledInput';
import Button from '@components/common/Modal/ModalButton';
import axios from 'axios';

import { SignInModalWrapper, SignInModalSignUpContainer, SignUpButton } from './styled';

export default function SignInModal({
  handleGoToSignUpBtnClicked,
}: {
  handleGoToSignUpBtnClicked: () => void;
}) {
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

  const handleSignInGithubClick = () => {
    const GH_SIGNIN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GH_ID}&redirect_url=${process.env.NEXT_PUBLIC_GH_CALLBACK}`;

    window.location.assign(GH_SIGNIN_URL);
  };

  const handleSignInBtnOnClick = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin/local`,
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
      <Button theme="second" onClick={handleSignInGithubClick}>
        <Image src={GithubIcon} alt="Github Icon" />
        Github으로 로그인하기
      </Button>
      <SignInModalSignUpContainer>
        <div>아직 계정이 없으신가요?</div>
        <SignUpButton onClick={handleGoToSignUpBtnClicked}>회원가입하기</SignUpButton>
      </SignInModalSignUpContainer>
    </SignInModalWrapper>
  );
}
