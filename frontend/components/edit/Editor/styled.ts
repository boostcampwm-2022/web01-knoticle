import styled from 'styled-components';

import { Flex } from '@styles/layout';

export const EditorWrapper = styled.div`
  width: 100%;
  height: calc(var(--window-inner-height));
  display: flex;

  > div:nth-child(2) {
    background-color: #f9f9f9;
  }
`;

export const EditorInner = styled.div`
  flex: 1;
  overflow: auto;
  padding: 32px;
  position: relative;

  @media ${(props) => props.theme.tablet} {
    &:nth-child(2) {
      display: none;
    }
  }
`;

export const EditorButtonWrapper = styled(Flex)`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--grey-02-color);
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EditorButton = styled.button`
  padding: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  &:hover {
    background-color: var(--light-orange-color);
  }

  img,
  label {
    width: 24px;
    height: 24px;
  }

  > div {
    color: var(--title-active-color);
  }
`;

export const EditorImageInput = styled.input`
  display: none;
`;

export const EditorButtonSplit = styled.div`
  border-left: 2px solid var(--grey-02-color);
  height: 16px;
`;

export const TitleInput = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const CodeMirrorWrapper = styled.div`
  font-size: 16px;
  height: calc(var(--window-inner-height) - 220px);
  overflow: auto;

  .cm-editor.cm-focused {
    outline: none;
  }
`;
