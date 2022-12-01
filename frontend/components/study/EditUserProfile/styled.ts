import Image from 'next/image';

import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
  width: 100%;
  margin: 40px 0 20px;
  display: flex;
  align-items: flex-end;
  /* justify-content: flex-start; */
`;

export const UserThumbnailGroup = styled.div``;

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

export const EditUsername = styled(Input)`
  font-size: 18px;
  line-height: 24px;
  width: 180px;
`;

export const EditUserDescription = styled(Input)`
  font-size: 14px;
  line-height: 20px;
  width: 340px;
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
  padding: 0 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  border: 1px solid rgba(148, 173, 46, 1);
  background-color: var(--green-color);
  color: var(--white-color);
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
