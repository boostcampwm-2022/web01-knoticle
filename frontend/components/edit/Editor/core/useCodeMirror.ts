import { useCallback, useEffect, useState } from 'react';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { placeholder } from '@codemirror/view';
import { EditorView } from 'codemirror';

import { createImageApi } from '@apis/imageApi';
import useFetch from '@hooks/useFetch';

import theme from './theme';

export default function useCodeMirror() {
  const { data: image, execute: createImage } = useFetch(createImageApi);

  const [editorView, setEditorView] = useState<EditorView>();

  const [value, setValue] = useState('');
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  const onChange = () => {
    return EditorView.updateListener.of(({ view, docChanged }) => {
      if (docChanged) setValue(view.state.doc.toString());
    });
  };

  const onPaste = () => {
    return EditorView.domEventHandlers({
      paste(event) {
        if (!event.clipboardData) return;

        const { items } = event.clipboardData;

        // eslint-disable-next-line no-restricted-syntax
        for (const item of items) {
          if (item.kind === 'file' && /image\/[png,jpg,jpeg,gif]/.test(item.type)) {
            const blob = item.getAsFile() as Blob;

            const formData = new FormData();

            formData.append('image', blob);

            createImage(formData);
          }
        }
      },
    });
  };

  useEffect(() => {
    if (!editorView) return;

    const cursor = editorView.state.selection.main.head;

    const markdownImage = (path: string) => `![image](${path})\n`;

    const insert = markdownImage(image.imagePath);

    editorView.dispatch({
      changes: {
        from: cursor,
        to: cursor,
        insert,
      },
      selection: { anchor: cursor + insert.length },
    });
  }, [image]);

  useEffect(() => {
    if (!element) return;

    const editorState = EditorState.create({
      extensions: [
        markdown({ base: markdownLanguage }),
        placeholder('내용을 입력해주세요.'),
        theme(),
        onChange(),
        onPaste(),
      ],
    });

    const view = new EditorView({
      state: editorState,
      parent: element,
    });

    setEditorView(view);

    // eslint-disable-next-line consistent-return
    return () => view?.destroy();
  }, [element]);

  return { ref, value };
}
