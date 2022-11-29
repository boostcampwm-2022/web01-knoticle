import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { TextXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const BookWrapper = styled(FlexColumn)`
  width: 100%;
  height: 500px;
  margin: 10px auto;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  overflow: hidden;

  color: var(--grey-01-color);
`;

export const BookThumbnail = styled(Image)`
  width: 100%;
  height: 200px;
  min-height: 200px;
`;

export const BookInfoContainer = styled(FlexColumn)`
  padding: 24px;
  gap: 18px;
`;

export const BookTitle = styled.div`
  div:nth-child(1) {
    font-weight: 700;
  }
`;

export const Input = styled.input`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;
`;

export const BookContentsInfo = styled(FlexColumn)`
  gap: 8px;

  div:nth-child(1) {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--primary-color);
  }
`;

export const BookContents = styled(TextXSmall)`
  display: flex;
  flex-direction: column;

  a {
    border-bottom: 1px solid var(--grey-02-color);
    height: 28px;
    display: flex;
    align-items: center;
  }
`;

export const Article = styled.div`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: inherit;
  display: block;
`;

export const Author = styled.div`
  font-size: 14px;
  line-height: 28px;
  text-decoration: none;
  color: inherit;
  display: block;
  margin-top: 2px;
`;
