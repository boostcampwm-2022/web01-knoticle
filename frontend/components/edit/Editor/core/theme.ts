import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export default function theme() {
  const highlightStyle = HighlightStyle.define([
    {
      tag: tags.heading1,
      'font-size': '24px',
      'font-weight': '700',
    },
    {
      tag: tags.heading2,
      'font-size': '20px',
      'font-weight': '700',
    },
    {
      tag: tags.heading3,
      'font-size': '16px',
      'font-weight': '700',
    },
  ]);

  return [syntaxHighlighting(highlightStyle)];
}
