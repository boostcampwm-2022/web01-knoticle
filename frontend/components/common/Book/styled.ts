import Image from 'next/image';
import Link from 'next/link';

import styled from 'styled-components';

import { TextXSmall } from '@styles/common';
import { FlexColumn } from '@styles/layout';

export const BookWrapper = styled(FlexColumn)`
  min-width: 280px;
  height: 480px;
  margin: 0 10px;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  overflow: hidden;

  color: var(--grey-01-color);
`;

export const BookThumbnail = styled(Image)`
  width: 280px;
  height: 200px;
  min-height: 200px;
`;

export const BookInfoContainer = styled(FlexColumn)`
  padding: 15px 24px;
  gap: 18px;
`;

export const BookTitle = styled.div`
  div:nth-child(1) {
    font-weight: 700;
  }

  b {
    color: var(--primary-color);
    font-weight: 700;
  }
`;

export const Bookmark = styled(FlexColumn)`
  align-items: center;
  gap: 4px;
`;

export const BookmarkIcon = styled(Image)`
  cursor: pointer;
`;

export const BookContentsInfo = styled(FlexColumn)`
  gap: 8px;

  div:nth-child(1) {
    box-sizing: border-box;
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

export const ArticleLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--grey-02-color);
  height: 28px;

  span {
    line-height: 30px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AuthorLink = styled(Link)`
  font-size: 14px;
  line-height: 28px;
  text-decoration: none;
  color: inherit;
  display: block;
  margin-top: 2px;
`;
