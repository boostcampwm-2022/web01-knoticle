import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createScrapApi } from '@apis/scrapApi';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IBook, IBookScraps, IScrap, IArticle } from '@interfaces';

import { ArticleWrapper, Label, ScrapModalWrapper } from './styled';

interface ScrapModalProps {
  books: IBookScraps[];
  handleModalClose: () => void;
  article: IArticle;
}

export default function ScrapModal({ books, handleModalClose, article }: ScrapModalProps) {
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [filteredScraps, setFilteredScraps] = useState<IScrap[]>([]);
  const { execute: createScrap } = useFetch(createScrapApi);

  const [scrapList, setScrapList] = useRecoilState(scrapState);

  const createBookDropdownItems = (items: IBook[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const createScrapDropdownItems = (items: IScrap[]) => {
    const itemList = [...items];

    itemList.push({
      id: 0,
      order: items.length + 1,
      article: {
        id: 0,
        title: article.title,
        content: '',
        created_at: '',
        deleted_at: '',
        book_id: 0,
      },
    });
    return itemList;
  };

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    setFilteredScraps(selectedBook ? selectedBook.scraps : []);
  }, [selectedBookIndex]);

  useEffect(() => {
    setScrapList(createScrapDropdownItems(filteredScraps));
  }, [filteredScraps]);

  const handleScrapBtnClick = () => {
    if (selectedBookIndex === -1) return;

    const scraps = scrapList.map((v, i) => ({ ...v, order: i + 1 }));

    createScrap({ book_id: selectedBookIndex, article_id: article.id, scraps });
    handleModalClose();
  };

  return (
    <ScrapModalWrapper>
      <Label>책 선택</Label>
      <Dropdown
        label="글이 담길 책을 선택해주세요."
        items={createBookDropdownItems(books)}
        selectedId={selectedBookIndex}
        handleItemSelect={(id) => setSelectedBookIndex(id)}
      />
      {filteredScraps.length !== 0 && (
        <ArticleWrapper>
          <Label>순서 선택</Label>
          <DragArticle data={createScrapDropdownItems(filteredScraps)} isContentsShown />
        </ArticleWrapper>
      )}
      <ModalButton theme="primary" onClick={handleScrapBtnClick}>
        스크랩하기
      </ModalButton>
    </ScrapModalWrapper>
  );
}
