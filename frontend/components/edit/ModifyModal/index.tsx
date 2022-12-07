import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { modifyArticleApi } from '@apis/articleApi';
import articleState from '@atoms/article';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IArticle, IBook, IBookScraps, IScrap } from '@interfaces';

import { ArticleWrapper, Label, ModifyModalWrapper } from './styled';

interface ModifyModalProps {
  books: IBookScraps[];
  originalArticle: IArticle;
}

export default function ModifyModal({ books, originalArticle }: ModifyModalProps) {
  const router = useRouter();

  const { id: originalArticleId, book_id: originalBookId } = originalArticle as IArticle;

  const { data: modifiedArticle, execute: modifyArticle } = useFetch(modifyArticleApi);

  const [article, setArticle] = useRecoilState(articleState);

  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [filteredScraps, setFilteredScraps] = useState<IScrap[]>([]);
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

    if (selectedBookIndex !== originalBookId)
      itemList.push({
        id: 0,
        order: items.length + 1,
        is_original: false,
        article: { id: 0, title: article.title },
      });
    return itemList;
  };

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    setFilteredScraps(selectedBook ? selectedBook.scraps : []);

    setArticle({
      ...article,
      book_id: selectedBookIndex,
    });
  }, [selectedBookIndex]);

  useEffect(() => {
    setScrapList(createScrapDropdownItems(filteredScraps));
  }, [filteredScraps]);

  const handleModifyBtnClick = () => {
    const scraps = scrapList.map((v: IScrap, i: number) => ({ ...v, order: i + 1 }));
    modifyArticle(originalArticleId, { article, scraps });
  };

  useEffect(() => {
    if (modifiedArticle) router.push('/');
  }, [modifiedArticle]);

  return (
    <ModifyModalWrapper>
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
          <DragArticle
            data={createScrapDropdownItems(filteredScraps)}
            isContentsShown
            isDeleteBtnShown={false}
          />
        </ArticleWrapper>
      )}
      <ModalButton theme="primary" onClick={handleModifyBtnClick}>
        수정하기
      </ModalButton>
    </ModifyModalWrapper>
  );
}
