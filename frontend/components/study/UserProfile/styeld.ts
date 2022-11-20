import Image from 'next/image';

import styled from 'styled-components';

import { TextLarge, TextSmall } from '../../../styles/common';

export const UserProfileWrapper = styled.div`
  width: 100%;
  margin: 40px 0 20px;
  display: flex;
  align-items: flex-end;
  /* justify-content: flex-start; */
`;

export const UserThumbnail = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 1px solid var(--grey-01-color);
`;

export const USerDetialGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  /* background-color: red; */
`;

export const Username = styled(TextLarge)``;

export const Userdesciprtion = styled(TextSmall)``;

export const ProfileEditButton = styled.button`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-radius: 10px;
  border: 1px solid var(--grey-01-color);
  margin: 30px 0 30px;
  cursor: pointer;
`;
