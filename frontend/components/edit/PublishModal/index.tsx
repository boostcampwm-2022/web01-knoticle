import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { createArticleApi } from '@apis/articleApi';
import articleState from '@atoms/article';
import scrapState from '@atoms/scrap';
import DragArticle from '@components/common/DragDrop';
import Dropdown from '@components/common/Dropdown';
import ModalButton from '@components/common/Modal/ModalButton';
import useFetch from '@hooks/useFetch';
import { IBook, IBookScraps, IScrap } from '@interfaces';
import { toastSuccess } from '@utils/toast';

import { ArticleWrapper, Label, PublishModalWrapper } from './styled';

interface PublishModalProps {
  books: IBookScraps[];
}

export default function PublishModal({ books }: PublishModalProps) {
  const router = useRouter();

  const { data: createdArticle, execute: createArticle } = useFetch(createArticleApi);

  // 전역으로 관리해야할까?
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

  const handlePublishBtnClick = () => {
    const scraps = scrapList.map((v, i) => ({ ...v, order: i + 1 }));

    createArticle({ article, scraps });
  };

  useEffect(() => {
    if (createdArticle) {
      const { id, title } = createdArticle.createdArticle;
      router.push(`/viewer/${selectedBookIndex}/${id}`);
      toastSuccess(`${title}글이 발행되었습니다.`);
    }
  }, [createdArticle]);

  return (
    <PublishModalWrapper>
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
      <ModalButton theme="primary" onClick={handlePublishBtnClick}>
        발행하기
      </ModalButton>
    </PublishModalWrapper>
  );
}
