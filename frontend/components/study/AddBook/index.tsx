import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { addBookApi } from '@apis/bookApi';
import SampleThumbnail from '@assets/img_sample_thumbnail.jpg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import signInStatusState from '@atoms/signInStatus';
import Button from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';
import { IBookScraps } from '@interfaces';
import { FlexSpaceBetween } from '@styles/layout';
import { toastSuccess } from '@utils/toast';

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

interface AddBookProps {
  handleModalClose: () => void;
}

export default function AddBook({ handleModalClose }: AddBookProps) {
  const [curKnottedBookList, setCurKnottedBookList] =
    useRecoilState<IBookScraps[]>(curKnottedBookListState);
  const user = useRecoilValue(signInStatusState);
  const title = useInput('');
  const { data: addBookData, execute: addBook } = useFetch(addBookApi);

  useEffect(() => {
    if (!addBookData) return;
    // 토스트 메세지, reload 중 어떤 방식으로 처리해야할까? -> 우선 민형님 작업이 끝나고 합치면서 확정예정
    setCurKnottedBookList([...curKnottedBookList, addBookData]);
    handleModalClose();
    toastSuccess(`${addBookData.title}책이 추가되었습니다!`);
  }, [addBookData]);

  const handleAddBookBtnClick = () => {
    addBook({ title: title.value });
  };
  return (
    <>
      <BookWrapper>
        <BookThumbnail src={SampleThumbnail} alt="thumbnail" />

        <BookInfoContainer>
          <FlexSpaceBetween>
            <BookTitle>
              <Input type="text" placeholder="제목을 입력하세요." {...title} />
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
      <Button theme="primary" onClick={handleAddBookBtnClick}>
        책 추가하기
      </Button>
    </>
  );
}
