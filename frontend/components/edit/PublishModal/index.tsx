import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createArticleApi } from '@apis/articleApi';
import articleState from '@atoms/article';
import ModalButton from '@components/common/Modal/ModalButton';
import Dropdown from '@components/edit/Dropdown';
import useFetch from '@hooks/useFetch';
import { Book, Scrap } from '@interfaces';

import { Label, PublishModalWrapper } from './styled';

interface PublishModalProps {
  books: Book[];
}

export default function PublishModal({ books }: PublishModalProps) {
  const { execute: createArticle } = useFetch(createArticleApi);

  const [article, setArticle] = useRecoilState(articleState);

  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [selectedScrapIndex, setSelectedScrapIndex] = useState(-1);
  const [filteredScraps, setFilteredScraps] = useState<Scrap[]>([]);

  const createBookDropdownItems = (items: Book[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const createScrapDropdownItems = (items: Scrap[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.article.title,
      };
    });

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    setSelectedScrapIndex(-1);
    setFilteredScraps(selectedBook ? selectedBook.scraps : []);

    setArticle({
      ...article,
      book_id: selectedBookIndex,
    });
  }, [selectedBookIndex]);

  useEffect(() => {
    setArticle((prev) => {
      const prevState = { ...prev };
      const selectedScrap = filteredScraps.find((scrap) => scrap.id === selectedScrapIndex);

      prevState.order = selectedScrap ? selectedScrap.order : 0;

      return { ...prevState };
    });
  }, [selectedScrapIndex]);

  return (
    <PublishModalWrapper>
      <Label>책 선택</Label>
      <Dropdown
        label="글이 담길 책을 선택해주세요."
        items={createBookDropdownItems(books)}
        selectedId={selectedBookIndex}
        handleItemSelect={(id) => setSelectedBookIndex(id)}
      />
      <Label>순서 선택</Label>
      <Dropdown
        label="글을 넣을 순서를 선택해주세요."
        items={createScrapDropdownItems(filteredScraps)}
        selectedId={selectedScrapIndex}
        handleItemSelect={(id) => setSelectedScrapIndex(id)}
      />
      <ModalButton theme="primary" onClick={() => createArticle(article)}>
        발행하기
      </ModalButton>
    </PublishModalWrapper>
  );
}
