import styled from 'styled-components';

export const EditorWrapper = styled.div`
  width: 100%;
  height: 100vh;
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
`;

export const CodeMirrorWrapper = styled.div`
  font-size: 16px;
  height: calc(100vh - 160px);
  overflow: auto;

  .cm-editor.cm-focused {
    outline: none;
  }
`;

export const TitleInput = styled.input`
  padding-left: 6px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;
