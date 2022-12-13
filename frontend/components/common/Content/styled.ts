import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const ContentTitle = styled.h1`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  height: 35px;
`;

export const ContentBody = styled.div`
  > * {
    line-height: 2;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  strong {
    font-weight: 700;
  }

  h1 {
    font-size: 24px;
    margin: 16px 0 8px 0;
  }

  h2 {
    font-size: 20px;
    margin: 16px 0 8px 0;
  }

  h3 {
    font-size: 18px;
    margin: 16px 0 8px 0;
  }

  ol,
  ul {
    padding-left: 16px;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  p {
    img {
      max-width: 720px;

      @media ${(props) => props.theme.mobile} {
        width: 100%;
      }
    }
  }

  a {
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
      text-decoration: underline;
    }
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin: 24px 0;
    padding: 24px 16px;
    border-left: 8px solid var(--light-orange-color);
  }

  code {
    padding: 2px 4px;
    background-color: var(--light-orange-color);
    border-radius: 4px;
  }

  pre {
    padding: 24px 16px;
    background-color: var(--light-orange-color);
    border-radius: 4px;
    font-family: 'consolas';
    font-size: 16px;
    line-height: 1.4;

    code {
      padding: 0;
      white-space: pre-wrap;
    }
  }
`;
