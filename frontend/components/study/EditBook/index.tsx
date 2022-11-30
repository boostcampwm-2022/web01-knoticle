import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { editBookApi } from '@apis/bookApi';
import { createImageApi } from '@apis/imageApi';
import Edit from '@assets/ico_edit.svg';
import MoreContentsIcon from '@assets/ico_more_contents.svg';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import { IBookScraps } from '@interfaces';
import { FlexSpaceBetween } from '@styles/layout';

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
  MoreContentsIconWrapper,
} from './styled';

interface BookProps {
  book: IBookScraps;
}

export default function EditBook({ book }: BookProps) {
  const { id, title, user, scraps, thumbnail_image } = book;
  const { value: titleData, onChange: onTitleChange } = useInput(title);
  const { data: imgFile, execute: createImage } = useFetch(createImageApi);
  const { data: editBookData, execute: editBook } = useFetch(editBookApi);
  // const [scrapList, setScrapList] = useState(scraps);

  const [isContentsShown, setIsContentsShown] = useState(false);

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
    editBook({
      id,
      title: titleData,
      thumbnail_image: imgFile.imagePath || thumbnail_image,
      scraps,
    });
  };

  const handleContentsOnClick = () => {
    setIsContentsShown((prev) => !prev);
  };

  return (
    <EditBookWapper>
      <BookWrapper>
        {isContentsShown ? null : (
          <EditBookThumbnailWrapper>
            <BookThumbnail
              src={imgFile?.imagePath || thumbnail_image}
              alt="thumbnail"
              width={318}
              height={220}
            />
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
        )}
        <BookInfoContainer>
          {isContentsShown ? null : (
            <FlexSpaceBetween>
              <BookTitle>
                <Input type="text" defaultValue={titleData} onChange={onTitleChange} />
                <Author>by {user.nickname}</Author>
              </BookTitle>
            </FlexSpaceBetween>
          )}

          <BookContentsInfo>
            <BookContent>Contents</BookContent>
            <BookContents>
              {scraps.map((scrap, idx) => (
                <Article key={scrap.article.id}>
                  {idx + 1}. {scrap.article.title}
                </Article>
              ))}
            </BookContents>
          </BookContentsInfo>
        </BookInfoContainer>
        <MoreContentsIconWrapper onClick={handleContentsOnClick}>
          <Image src={MoreContentsIcon} alt="More Contents Icon" width={12} height={12} />
        </MoreContentsIconWrapper>
      </BookWrapper>
      <Button theme="primary" onClick={handleCompletedBtnClick}>
        수정 완료
      </Button>
    </EditBookWapper>
  );
}
