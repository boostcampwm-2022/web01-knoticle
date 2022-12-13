import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import stripMarkdown from 'strip-markdown';
import { unified } from 'unified';

export const markdown2html = (markdown: string) => {
  const html = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();

  const htmlWithSyntaxHighlight = rehype()
    .use(rehypeHighlight, { ignoreMissing: true })
    .processSync(html)
    .toString();

  return htmlWithSyntaxHighlight;
};

export const html2markdown = (html: string) => {
  const markdown = unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(html)
    .toString();

  return markdown;
};

export const markdown2text = (markdown: string) => {
  const text = remark().use(stripMarkdown).processSync(markdown).toString();

  return text;
};
