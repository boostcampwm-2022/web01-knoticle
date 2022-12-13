import rehypeHighlight from 'rehype-highlight';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export const markdown2html = (markdown: string) => {
  const html = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();

  return unified()
    .use(rehypeParse)
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify)
    .processSync(html)
    .toString();
};

export const html2markdown = (html: string) => {
  return unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(html)
    .toString();
};
