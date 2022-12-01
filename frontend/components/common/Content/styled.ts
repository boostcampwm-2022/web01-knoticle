import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const ContentTitle = styled.h1`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
`;

export const ContentBody = styled.div`
  padding-top: 10px;

  > * {
    line-height: 1.4;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
  }

  ol {
    list-style-type: decimal;
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
  }

  p {
    img {
      width: 100%;
    }
  }
`;
