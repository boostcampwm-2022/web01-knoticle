import { useCallback, useEffect, useState } from 'react';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { placeholder } from '@codemirror/view';
import { EditorView } from 'codemirror';

import theme from './theme';

export default function useCodeMirror() {
  const [value, setValue] = useState('');
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  function onChange() {
    return EditorView.updateListener.of(({ view, docChanged }) => {
      if (docChanged) setValue(view.state.doc.toString());

      // console.log(view.state.selection.main.head);
      // console.log(view.state.doc.lineAt(view.state.selection.main.head).number);
    });
  }

  useEffect(() => {
    if (!element) return;

    const editorState = EditorState.create({
      extensions: [
        markdown({ base: markdownLanguage }),
        placeholder('내용을 입력해주세요.'),
        theme(),
        onChange(),
      ],
    });

    const view = new EditorView({
      state: editorState,
      parent: element,
    });

    // eslint-disable-next-line consistent-return
    return () => view?.destroy();
  }, [element]);

  return { ref, value };
}
