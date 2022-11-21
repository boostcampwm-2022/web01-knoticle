import Image from 'next/image';

import BookmarkIcon from '../../../assets/ico_bookmark.svg';
import MoreContentsIcon from '../../../assets/ico_more_contents.svg';
import SampleThumbnail from '../../../assets/img_sample_thumbnail.jpg';
import { TextLarge, TextXSmall, TextSmall } from '../../../styles/common';
import { FlexCenter, FlexSpaceBetween } from '../../../styles/layout';
import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  Bookmark,
  BookContentsInfo,
  BookContents,
} from './styled';

export default function Book() {
  return (
    <BookWrapper>
      <Image src={SampleThumbnail} alt="thumbnail" width={280} height={200} />
      <BookInfoContainer>
        <FlexSpaceBetween>
          <BookTitle>
            <TextLarge>리액트 마스터하기</TextLarge>
            <TextXSmall>by Web01</TextXSmall>
          </BookTitle>
          <Bookmark>
            <Image src={BookmarkIcon} alt="Bookmark Icon" />
            <TextXSmall>398</TextXSmall>
          </Bookmark>
        </FlexSpaceBetween>
        <BookContentsInfo>
          <TextSmall>Contents</TextSmall>
          <BookContents>
            <div>1. Create-react-app</div>
            <div>2. JSX</div>
            <div>3. State</div>
            <div>4. Props</div>
          </BookContents>
          <FlexCenter>
            <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
          </FlexCenter>
        </BookContentsInfo>
      </BookInfoContainer>
    </BookWrapper>
  );
}
