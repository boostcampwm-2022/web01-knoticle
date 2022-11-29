import { useRecoilValue } from 'recoil';

import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import signInStatusState from '@atoms/signInStatus';
import { FlexCenter, FlexSpaceBetween } from '@styles/layout';

import {
  BookWrapper,
  BookThumbnail,
  BookInfoContainer,
  BookTitle,
  BookContentsInfo,
  BookContents,
  Article,
  Author,
  Input,
  BookContent,
} from './styled';

export default function AddBook() {
  const user = useRecoilValue(signInStatusState);
  return (
    <BookWrapper>
      <BookThumbnail src={SampleThumbnail} alt="thumbnail" />

      <BookInfoContainer>
        <FlexSpaceBetween>
          <BookTitle>
            <Input
              type="text"
              placeholder="제목을 입력하세요."
              onChange={(e) => console.log(e.target.value)}
            />
            <Author>by {user.nickname}</Author>
          </BookTitle>
        </FlexSpaceBetween>

        <BookContentsInfo>
          <BookContent>Contents</BookContent>
          <BookContents>
            <Article>새로운 글들로 채워주세요</Article>
          </BookContents>
        </BookContentsInfo>
      </BookInfoContainer>
    </BookWrapper>
  );
}
