import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

import { EditorWrapper } from './styled';

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
