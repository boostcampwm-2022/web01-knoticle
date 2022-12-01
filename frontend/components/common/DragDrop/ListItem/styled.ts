import styled from 'styled-components';

const Article = styled.div<{ isShown: true | false }>`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: inherit;
  display: ${(props) => (props.isShown ? 'block' : 'none')};
  padding: 2px 0;
  border-bottom: 1px solid var(--grey-02-color);
`;

export default Article;
