import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createScrapApi } from '@apis/scrapApi';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IBook, IArticle, IScrap, IBookScraps } from '@interfaces';

import { ArticleWrapper, Label, ScrapModalWrapper, WarningLabel } from './styled';

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

  const [isSelectedBookUnavailable, setSelectedBookUnavailable] = useState(false);

  const createBookDropdownItems = (items: IBook[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const createScrapDropdownItems = (items: IScrap[]) => {
    return [
      ...items,
      {
        id: 0,
        order: items.length + 1,
        is_original: true,
        article: { id: article.id, title: article.title },
      },
    ];
  };

  const checkArticleExistsInBook = (articleId: number, items: IScrap[]) => {
    return items.some((item) => item.article.id === articleId);
  };

  useEffect(() => {
    if (selectedBookIndex === -1) return;

    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    if (!selectedBook || checkArticleExistsInBook(article.id, selectedBook.scraps)) {
      setSelectedBookIndex(-1);
      setSelectedBookUnavailable(true);
      setFilteredScraps([]);
      return;
    }

    setSelectedBookUnavailable(false);
    setFilteredScraps(selectedBook.scraps);

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
      {isSelectedBookUnavailable && (
        <WarningLabel>선택하신 책에 이미 동일한 글이 존재합니다.</WarningLabel>
      )}
      {filteredScraps.length !== 0 && (
        <ArticleWrapper>
          <Label>순서 선택</Label>
          <DragArticle
            data={createScrapDropdownItems(filteredScraps)}
            isContentsShown
            isDeleteBtnShown={false}
          />
        </ArticleWrapper>
      )}
      <ModalButton theme="primary" onClick={handleScrapBtnClick}>
        스크랩하기
      </ModalButton>
    </ScrapModalWrapper>
  );
}
