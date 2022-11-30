import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { createImageApi } from '@apis/imageApi';
import Edit from '@assets/ico_edit.svg';
import MoreContentsIcon from '@assets/ico_more_contents.svg';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
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
  EditBookWapper,
  EditBookThumbnailWrapper,
  EditBookThumbnailIcon,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function EditBook({ book }: BookProps) {
  const { id, title, user, scraps } = book;
  const { value: titleData, onChange: onTitleChange } = useInput(title);
  const { data: imgFile, execute: createImage } = useFetch(createImageApi);
  const [scrapList, setScrapList] = useState(scraps);

  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleEditBookImgClick = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!event.target.files) return;

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    createImage(formData);
  };

  const handleCompletedBtnClick = () => {
    console.log(id);
    console.log(titleData);
    console.log('click', imgFile);
    console.log(scrapList);
  };

  return (
    <EditBookWapper>
      <BookWrapper>
        <EditBookThumbnailWrapper>
          <BookThumbnail src={SampleThumbnail} alt="thumbnail" />
          <EditBookThumbnailIcon onClick={handleEditBookImgClick}>
            <Image src={Edit} alt="profile_edit" width={20} />
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </EditBookThumbnailIcon>
        </EditBookThumbnailWrapper>
        <BookInfoContainer>
          <FlexSpaceBetween>
            <BookTitle>
              <Input type="text" defaultValue={title} onChange={onTitleChange} />
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
          <FlexCenter>
            <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
          </FlexCenter>
        </BookInfoContainer>
      </BookWrapper>
      <Button theme="primary" onClick={handleCompletedBtnClick}>
        수정 완료
      </Button>
    </EditBookWapper>
  );
}
