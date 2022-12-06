import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import articleState from '@atoms/article';
import Content from '@components/common/Content';
import EditBar from '@components/edit/EditBar';
import useCodeMirror from '@components/edit/Editor/core/useCodeMirror';
import useInput from '@hooks/useInput';
import { IArticle } from '@interfaces';
import { CodeMirrorWrapper, EditorInner, EditorWrapper, TitleInput } from './styled';

interface EditorProps {
  handleModalOpen: () => void;
  originalArticle?: IArticle;
}

export default function Editor({ handleModalOpen, originalArticle }: EditorProps) {
  const { ref, value } = useCodeMirror();

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [article, setArticle] = useRecoilState(articleState);
  const title = useInput();

  useEffect(() => {
    if (originalArticle) {
      setIsModifyMode(true);
      setArticle({
        title: originalArticle.title,
        content: originalArticle.content,
        book_id: originalArticle.book_id,
      });
    }
  }, [originalArticle]);

  useEffect(() => {
    setArticle({
      ...article,
      title: title.value,
    });
  }, [title.value]);

  useEffect(() => {
    setArticle({
      ...article,
      content: unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(value)
        .toString(),
    });
  }, [value]);

  return (
    <EditorWrapper>
      <EditorInner>
        <TitleInput placeholder="제목을 입력해주세요" {...title} />
        <CodeMirrorWrapper>
          <div ref={ref} />
        </CodeMirrorWrapper>
        <EditBar handleModalOpen={handleModalOpen} isModifyMode={isModifyMode} />
      </EditorInner>
      <EditorInner>
        <Content title={article.title} content={article.content} />
      </EditorInner>
    </EditorWrapper>
  );
}

Editor.defaultProps = {
  originalArticle: '',
};
