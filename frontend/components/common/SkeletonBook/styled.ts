import Image from 'next/image';

import styled from 'styled-components';

import { FlexColumn } from '@styles/layout';

const SkeletonItem = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

export const BookWrapper = styled(FlexColumn)`
  min-width: 280px;
  max-width: 280px;
  height: 480px;
  margin: 0 10px;
  box-sizing: border-box;

  background-color: var(--white-color);
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
`;

export const BookThumbnail = styled(SkeletonItem)`
  width: 280px;
  height: 200px;
  min-height: 200px;
`;

export const BookInfoContainer = styled(FlexColumn)`
  padding: 15px 24px;
  gap: 18px;
`;

export const BookTitle = styled(SkeletonItem)`
  height: 30px;
  width: 140px;
`;

export const BookAuthor = styled(SkeletonItem)`
  height: 20px;
  width: 60px;
  margin-top: 10px;
`;

export const Bookmark = styled(SkeletonItem)`
  height: 30px;
  width: 30px;
`;

export const BookmarkIcon = styled(Image)`
  cursor: pointer;
`;

export const BookContentsInfo = styled(FlexColumn)`
  gap: 8px;
  margin-top: 30px;
`;

export const BookContents = styled(SkeletonItem)`
  height: 20px;
  width: 100%;
`;
