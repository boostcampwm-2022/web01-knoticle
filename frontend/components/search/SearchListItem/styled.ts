import styled from 'styled-components';

import { TextMedium, TextSmall } from '../../../styles/common';

export const ItemWrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 32px;
  border-bottom: 1px solid var(--grey-02-color);
`;

export const ItemGroup = styled.div`
  flex: 1;
`;

export const ItemTitle = styled(TextMedium)`
  margin-bottom: 16px;
`;

export const ItemContent = styled(TextSmall)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const ProfileDescription = styled.div`
  div:first-child {
    color: var(--grey-01-color);
  }

  div {
    text-align: right;
  }
`;

export const ProfileImage = styled.div`
  border: 1px solid var(--grey-01-color);
  border-radius: 36px;
  overflow: hidden;
`;
