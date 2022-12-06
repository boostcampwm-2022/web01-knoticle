import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export const markdown2html = (html: string) => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(html)
    .toString();
};

export const html2markdown = (markdown: string) => {
  return unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(markdown)
    .toString();
};
