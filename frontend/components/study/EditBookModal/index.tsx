import Image from 'next/image';

import { useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createImageApi } from '@apis/imageApi';
import Edit from '@assets/ico_edit.svg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import editInfoState from '@atoms/editInfo';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import { IBookScraps } from '@interfaces';
import { FlexSpaceBetween } from '@styles/layout';
import { toastError } from '@utils/toast';

import {
  BookWrapper,
  BookInfoContainer,
  BookTitle,
  BookContentsInfo,
  BookThumbnail,
  Author,
  Input,
  BookContent,
  EditBookWapper,
  EditBookThumbnailWrapper,
  EditBookThumbnailIcon,
  EditArticle,
  DragArticleWrapper,
  ContentsWrapper,
  DragArticleText,
} from './styled';

interface BookProps {
  book: IBookScraps;
  handleModalClose: () => void;
}

export default function EditBookModal({ book, handleModalClose }: BookProps) {
  const { id, title, user } = book;

  const { data: imgFile, execute: createImage } = useFetch(createImageApi);
  const { value: titleData, onChange: onTitleChange } = useInput(title);

  const [editInfo, setEditInfo] = useRecoilState(editInfoState);
  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [scrapList] = useRecoilState(scrapState);

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
    if (titleData === '') {
      toastError('??? ????????? ??????????????????.');
      return;
    }

    const editScraps = scrapList.map((v, i) => ({ ...v, order: i + 1 }));

    // ???????????? ?????? ????????? ???????????? ???????????? ?????? ?????? ???????????? ????????????
    setCurKnottedBookList([
      ...curKnottedBookList.map((curBook) => {
        if (id === curBook.id) {
          return {
            ...curBook,
            title: titleData,
            thumbnail_image: imgFile?.imagePath || book.thumbnail_image,
            scraps: editScraps,
          };
        }
        return curBook;
      }),
    ]);

    // editInfo??? ?????? ????????????
    setEditInfo({
      ...editInfo,
      editted: [
        ...editInfo.editted.filter((edit) => edit.id !== id),
        {
          id,
          title: titleData,
          thumbnail_image: imgFile?.imagePath || book.thumbnail_image,
          scraps: editScraps,
        },
      ],
    });
    handleModalClose();
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
              src={imgFile?.imagePath || book.thumbnail_image}
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
            <ContentsWrapper>
              <BookContent>Contents</BookContent>
              <EditArticle onClick={handleContentsOnClick}>
                {isContentsShown ? '????????????' : '????????????'}
              </EditArticle>
            </ContentsWrapper>
            <DragArticleWrapper isContentsShown={isContentsShown}>
              <DragArticle isContentsShown={isContentsShown} isDeleteBtnShown />
            </DragArticleWrapper>
            {isContentsShown && (
              <DragArticleText>???????????????????????? ?????? ????????? ????????? ??? ????????????.</DragArticleText>
            )}
          </BookContentsInfo>
        </BookInfoContainer>
      </BookWrapper>
      <Button theme="primary" onClick={handleCompletedBtnClick}>
        ?????? ??????
      </Button>
    </EditBookWapper>
  );
}
