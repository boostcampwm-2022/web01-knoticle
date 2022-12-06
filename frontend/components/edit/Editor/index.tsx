import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import Content from '@components/common/Content';
import EditBar from '@components/edit/EditBar';
import useCodeMirror from '@components/edit/Editor/core/useCodeMirror';
import useInput from '@hooks/useInput';
import { IArticle } from '@interfaces';
import { html2markdown, markdown2html } from '@utils/parser';

import { CodeMirrorWrapper, EditorInner, EditorWrapper, TitleInput } from './styled';

interface EditorProps {
  handleModalOpen: () => void;
  originalArticle?: IArticle;
}

export default function Editor({ handleModalOpen, originalArticle }: EditorProps) {
  const { ref, document, replaceDocument } = useCodeMirror();
  const [buffer, setBuffer] = useRecoilState(articleBuffer);

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
    if (!buffer.title && !buffer.content) return;

    title.setValue(buffer.title);
    replaceDocument(html2markdown(buffer.content));

    setBuffer({ title: '', content: '' });
  }, [buffer]);

  useEffect(() => {
    setArticle({
      ...article,
      title: title.value,
      content: markdown2html(document),
    });
  }, [title.value, document]);

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
