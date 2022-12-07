import { FlexColumn, FlexSpaceBetween } from '@styles/layout';

import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  BookContentsInfo,
  BookContents,
  BookThumbnail,
  BookAuthor,
  Bookmark,
} from './styled';

export default function SkeletonBook() {
  const bookContentsList = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <BookWrapper>
      <BookThumbnail />

      <BookInfoContainer>
        <FlexSpaceBetween>
          <FlexColumn>
            <BookTitle />
            <BookAuthor />
          </FlexColumn>
          <Bookmark />
        </FlexSpaceBetween>

        <BookContentsInfo>
          {bookContentsList.map((key) => (
            <BookContents key={key} />
          ))}
        </BookContentsInfo>
      </BookInfoContainer>
    </BookWrapper>
  );
}
