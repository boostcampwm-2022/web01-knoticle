import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import BoldIcon from '@assets/ico_bold.svg';
import CodeIcon from '@assets/ico_code.svg';
import H1Icon from '@assets/ico_h1.svg';
import H2Icon from '@assets/ico_h2.svg';
import H3Icon from '@assets/ico_h3.svg';
import ImageIcon from '@assets/ico_image.svg';
import ItalicIcon from '@assets/ico_italic.svg';
import QuoteIcon from '@assets/ico_quote.svg';
import articleState from '@atoms/article';
import articleBuffer from '@atoms/articleBuffer';
import Content from '@components/common/Content';
import EditBar from '@components/edit/EditBar';
import useCodeMirror from '@components/edit/Editor/core/useCodeMirror';
import useInput from '@hooks/useInput';
import { IArticle } from '@interfaces';
import { html2markdown, markdown2html } from '@utils/parser';

import {
  EditorButtonWrapper,
  CodeMirrorWrapper,
  EditorInner,
  EditorWrapper,
  TitleInput,
  EditorButton,
  EditorButtonSplit,
  EditorImageInput,
} from './styled';

interface EditorProps {
  handleModalOpen: () => void;
  originalArticle?: IArticle;
}

export default function Editor({ handleModalOpen, originalArticle }: EditorProps) {
  const { ref, document, replaceDocument, insertStartToggle, insertBetweenToggle, handleImage } =
    useCodeMirror();
  const [buffer, setBuffer] = useRecoilState(articleBuffer);

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [article, setArticle] = useRecoilState(articleState);
  const title = useInput();

  useEffect(() => {
    if (originalArticle) {
      setIsModifyMode(true);
      setBuffer({
        title: originalArticle.title,
        content: originalArticle.content,
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
        <EditorButtonWrapper>
          <EditorButton onClick={() => insertStartToggle('# ')}>
            <Image src={H1Icon} alt="Heading1 Icon" />
          </EditorButton>
          <EditorButton onClick={() => insertStartToggle('## ')}>
            <Image src={H2Icon} alt="Heading2 Icon" />
          </EditorButton>
          <EditorButton onClick={() => insertStartToggle('### ')}>
            <Image src={H3Icon} alt="Heading3 Icon" />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton onClick={() => insertBetweenToggle('**')}>
            <Image src={BoldIcon} alt="Bold Icon" />
          </EditorButton>
          <EditorButton onClick={() => insertBetweenToggle('_')}>
            <Image src={ItalicIcon} alt="Italic Icon" />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton onClick={() => insertStartToggle('> ')}>
            <Image src={QuoteIcon} alt="Quote Icon" />
          </EditorButton>
          <EditorButton onClick={() => insertBetweenToggle('\n```\n', '코드')}>
            <Image src={CodeIcon} alt="Code Icon" />
          </EditorButton>
          <EditorButtonSplit />
          <EditorButton>
            <label htmlFor="image">
              <Image src={ImageIcon} alt="Image Icon" />
            </label>
            <EditorImageInput
              id="image"
              type="file"
              accept="image/png,image/jpg,image/jpeg,image/gif"
              onChange={(event) => {
                if (event.target.files) handleImage(event.target.files[0]);
              }}
            />
          </EditorButton>
        </EditorButtonWrapper>
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
