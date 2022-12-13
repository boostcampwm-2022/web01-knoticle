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
import { toastSuccess } from '@utils/toast';

import { ArticleWrapper, Label, ModifyModalWrapper, WarningLabel } from './styled';

interface ModifyModalProps {
  books: IBookScraps[];
  originalArticle: IArticle;
}

export default function ModifyModal({ books, originalArticle }: ModifyModalProps) {
  const router = useRouter();

  const { id: originalArticleId, book_id: originalBookId } = originalArticle as IArticle;

  const { data: modifiedArticle, execute: modifyArticle } = useFetch(modifyArticleApi);

  const [article, setArticle] = useRecoilState(articleState);

  const [selectedBookIndex, setSelectedBookIndex] = useState(originalBookId);
  const [filteredScraps, setFilteredScraps] = useState<IScrap[]>([]);
  const [scrapList, setScrapList] = useRecoilState(scrapState);

  const [isSelectedBookUnavailable, setSelectedBookUnavailable] = useState(false);

  const createBookDropdownItems = (items: IBook[]) =>
    items.map((item) => {
      return {
        id: item.id,
        name: item.title,
      };
    });

  const checkArticleExistsInBook = (articleId: number, items: IScrap[]) => {
    return items.some((item) => item.article.id === articleId);
  };

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
    if (selectedBookIndex === -1) return;

    const selectedBook = books.find((book) => book.id === selectedBookIndex);

    if (
      !selectedBook ||
      (selectedBookIndex !== originalBookId &&
        checkArticleExistsInBook(originalArticleId, selectedBook.scraps))
    ) {
      setSelectedBookIndex(-1);
      setSelectedBookUnavailable(true);
      setFilteredScraps([]);
      return;
    }

    setSelectedBookUnavailable(false);
    setFilteredScraps(selectedBook.scraps);

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
    if (modifiedArticle) {
      const { id, title } = modifiedArticle.modifiedArticle;
      router.push(`/viewer/${selectedBookIndex}/${id}`);
      toastSuccess(`${title}글이 수정되었습니다.`);
    }
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
      {isSelectedBookUnavailable && (
        <WarningLabel>선택하신 책에 본 글이 스크랩되어 있습니다.</WarningLabel>
      )}
      {filteredScraps.length !== 0 && (
        <ArticleWrapper>
          <Label>순서 선택</Label>
          <DragArticle isContentsShown isDeleteBtnShown={false} />
        </ArticleWrapper>
      )}
      <ModalButton theme="primary" onClick={handleModifyBtnClick}>
        수정하기
      </ModalButton>
    </ModifyModalWrapper>
  );
}
