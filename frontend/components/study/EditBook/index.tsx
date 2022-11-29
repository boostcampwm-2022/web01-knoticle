import Image from 'next/image';

import MoreContentsIcon from '@assets/ico_more_contents.svg';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import Button from '@components/common/Modal/ModalButton';
import { IBookScraps } from '@interfaces';
import { FlexCenter, FlexSpaceBetween } from '@styles/layout';

import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  BookContentsInfo,
  BookContents,
  BookThumbnail,
  Article,
  Author,
  Input,
  BookContent,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function EditBook({ book }: BookProps) {
  const { id, title, user, scraps } = book;

  return (
    <>
      <BookWrapper>
        <BookThumbnail src={SampleThumbnail} alt="thumbnail" />

        <BookInfoContainer>
          <FlexSpaceBetween>
            <BookTitle>
              <Input
                type="text"
                defaultValue={title}
                onChange={(e) => console.log(e.target.value)}
              />
              <Author>by {user.nickname}</Author>
            </BookTitle>
          </FlexSpaceBetween>

          <BookContentsInfo>
            <BookContent>Contents</BookContent>
            <BookContents>
              {scraps.map(
                (scrap, idx) =>
                  idx < 4 && (
                    <Article key={scrap.article.id}>
                      {idx + 1}. {scrap.article.title}
                    </Article>
                  )
              )}
            </BookContents>
          </BookContentsInfo>
          {scraps.length > 4 && (
            <FlexCenter>
              <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
            </FlexCenter>
          )}
        </BookInfoContainer>
      </BookWrapper>
      <Button theme="primary" onClick={() => console.log('수정!')}>
        수정 완료
      </Button>
    </>
  );
}
