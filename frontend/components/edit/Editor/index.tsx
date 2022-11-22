import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

import { EditorWrapper, TitleInput } from './styled';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export default function Editor() {
  const [content, setContent] = useState<string | undefined>('');
  const [editorHeight, setEditorHeight] = useState(0);

  useEffect(() => {
    setEditorHeight(window.innerHeight - 68);
  }, []);

  return (
    <EditorWrapper>
      <TitleInput placeholder="제목을 입력해주세요" />
      <MDEditor
        height={editorHeight}
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
    </EditorWrapper>
  );
}
