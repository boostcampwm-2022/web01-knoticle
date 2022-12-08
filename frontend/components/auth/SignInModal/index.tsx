import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import { localSignInApi } from '@apis/authApi';
import GithubIcon from '@assets/ico_github.svg';
import LabeledInput from '@components/common/LabeledInput';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';

import { SignInModalWrapper, SignUpContainer, SignUpButton } from './styled';

interface SignInModalProps {
  handleGoToSignUpBtnClicked: () => void;
  handleModalClose: () => void;
}

export default function SignInModal({
  handleGoToSignUpBtnClicked,
  handleModalClose,
}: SignInModalProps) {
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });
  const { data: user, execute: localSignIn } = useFetch(localSignInApi);
  const router = useRouter();

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
    localSignIn({
      username: info.username,
      password: info.password,
    });
  };

  useEffect(() => {
    if (!user) return;

    handleModalClose();
    router.reload();
  }, [user]);

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
      <SignUpContainer>
        <div>아직 계정이 없으신가요?</div>
        <SignUpButton onClick={handleGoToSignUpBtnClicked}>회원가입하기</SignUpButton>
      </SignUpContainer>
    </SignInModalWrapper>
  );
}
