import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import Preview from '@components/edit/Preview';

import { CodeMirrorWrapper, EditorInner, EditorWrapper, TitleInput } from './styled';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
});

export default function Editor() {
  const [content, setContent] = useState('');
  const [html, setHtml] = useState('');

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight - 68);
  }, []);

  useEffect(() => {
    setHtml(
      unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(content)
        .toString()
    );
  }, [content]);

  return (
    <EditorWrapper style={{ height }}>
      <EditorInner>
        <TitleInput placeholder="제목을 입력해주세요" />
        <CodeMirrorWrapper>
          <CodeMirror
            value={content}
            onChange={(value) => setContent(value)}
            extensions={[
              markdown({
                base: markdownLanguage,
                codeLanguages: languages,
              }),
            ]}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightSelectionMatches: false,
            }}
          />
        </CodeMirrorWrapper>
      </EditorInner>
      <Preview title="title" content={html} />
    </EditorWrapper>
  );
}
