import Image from 'next/image';

import styled from 'styled-components';

import { TextSmall } from '@styles/common';
import { Flex } from '@styles/layout';

export const UserProfileWrapper = styled.div`
  margin: 40px 0 20px 0;
  width: 78%;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
`;

export const UserThumbnailGroup = styled.div``;

export const UserThumbnail = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
  border: 1px solid var(--grey-01-color);
`;

export const UserDetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 20px;
  }
`;

export const Input = styled.input`
  padding: 4px;
  width: auto;
  box-sizing: border-box;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;
  color: var(--title-active-color);
  outline: none;
  margin: 5px 0;
`;

export const UsernameGroup = styled(Flex)`
  align-items: center;
`;

export const EditUsername = styled(Input)`
  font-size: 18px;
  line-height: 24px;
  width: 180px;
`;

export const EditUserDescription = styled(Input)`
  font-size: 14px;
  line-height: 20px;
  width: 400px;
  @media ${(props) => props.theme.tablet} {
    width: 250px;
  }
`;

export const ButtonGroup = styled.div<{ isVisible: boolean }>`
  display: flex;
  gap: 8px;
  ${(props) => (props.isVisible ? '' : 'visibility : hidden')}
`;

const Button = styled.button`
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px 0 30px;
`;

export const ProfileEditButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;

  border-radius: 10px;
  color: var(--white-color);
  border: 1px solid ${(props) => (props.disabled ? 'var(--red-color)' : 'rgba(148, 173, 46, 1)')};
  background-color: ${(props) => (props.disabled ? 'var(--red-color)' : 'var(--green-color)')};
`;

export const EditThumbnailIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 10px;
  box-sizing: content-box;
  border: 1px solid var(--grey-01-color);
  transform: translate(380%, -100%);
  background-color: var(--light-yellow-color);
  cursor: pointer;
`;

export const RedNotice = styled(TextSmall)`
  color: var(--red-color);
  margin-left: 10px;
`;
