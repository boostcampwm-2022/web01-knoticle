import Image from 'next/image';

import styled from 'styled-components';

import { TextLarge, TextSmall } from '@styles/common';

export const UserProfileWrapper = styled.div`
  width: 100%;
  margin: 40px 0 20px 40px;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

export const UserThumbnail = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 1px solid var(--grey-01-color);
`;

export const UserDetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  /* background-color: red; */
  @media ${(props) => props.theme.mobile} {
    margin-top: 20px;
  }
`;

export const Username = styled(TextLarge)``;

export const UserDescription = styled(TextSmall)``;

export const ButtonGroup = styled.div<{ isVisible: boolean }>`
  display: flex;
  gap: 8px;
  ${(props) => (props.isVisible ? '' : 'visibility : hidden')}
`;

const Button = styled.button`
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  margin: 30px 0 30px;
`;

export const ProfileEditButton = styled(Button)`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  border: 1px solid var(--grey-01-color);
`;

export const LogoutButton = styled(Button)`
  border: 1px solid #8f4c26;
  background-color: var(--primary-color);
  color: white;
`;
