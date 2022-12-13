import { markdown2html } from '@utils/parser';

import { ContentBody, ContentTitle, ContentWrapper } from './styled';

import 'highlight.js/styles/github.css';

interface ContentProps {
  title?: string;
  content: string;
}

export default function Content({ title, content }: ContentProps) {
  return (
    <ContentWrapper>
      {title && <ContentTitle>{title}</ContentTitle>}
      <ContentBody
        dangerouslySetInnerHTML={{
          __html: markdown2html(content),
        }}
      />
    </ContentWrapper>
  );
}

Content.defaultProps = {
  title: '',
};
