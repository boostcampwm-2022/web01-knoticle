import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { createImageApi } from '@apis/imageApi';
import articleState from '@atoms/article';
import Content from '@components/common/Content';
import useCodeMirror from '@components/edit/Editor/core/useCodeMirror';
import useFetch from '@hooks/useFetch';
import useInput from '@hooks/useInput';

import { CodeMirrorWrapper, EditorInner, EditorWrapper, TitleInput } from './styled';

export default function Editor() {
  const { data: imagePath, execute: createImage } = useFetch(createImageApi);

  const [article, setArticle] = useRecoilState(articleState);

  const [height, setHeight] = useState(0);

  const title = useInput();

  useEffect(() => {
    setHeight(window.innerHeight - 68);
  }, []);

  useEffect(() => {
    setArticle({
      ...article,
      title: title.value,
    });
  }, [title.value]);

  useEffect(() => {
    console.log(imagePath);
  }, [imagePath]);

  const handleImagePaste = (event: ClipboardEvent) => {
    if (!event.clipboardData) return;

    const { items } = event.clipboardData;

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      if (item.kind === 'file' && /image\/[png,jpg,jpeg,gif]/.test(item.type)) {
        const blob = item.getAsFile();

        const formData = new FormData();

        formData.append('image', blob);

        createImage(formData);
      }
    }
  };

  const { ref, value } = useCodeMirror();

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
    <EditorWrapper style={{ height }}>
      <EditorInner>
        <TitleInput placeholder="제목을 입력해주세요" {...title} />
        <CodeMirrorWrapper>
          <div ref={ref} />
        </CodeMirrorWrapper>
      </EditorInner>
      <EditorInner>
        <Content title={article.title} content={article.content} />
      </EditorInner>
    </EditorWrapper>
  );
}
