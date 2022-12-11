import styled from 'styled-components';

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

export const CodeMirrorWrapper = styled.div`
  font-size: 16px;
  height: calc(var(--window-inner-height) - 160px);
  overflow: auto;

  .cm-editor.cm-focused {
    outline: none;
  }
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
