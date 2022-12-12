import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export default function theme() {
  const highlightStyle = HighlightStyle.define([
    { tag: t.heading1, fontSize: '24px', fontWeight: '700' },
    { tag: t.heading2, fontSize: '20px', fontWeight: '700' },
    { tag: t.heading3, fontSize: '18px', fontWeight: '700' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.invalid, color: '#cb2431' },
    { tag: t.name, color: '#22863a' },
    { tag: t.emphasis, color: '#24292e', fontStyle: 'italic' },
    { tag: t.deleted, color: '#b31d28', backgroundColor: '#ffeef0' },
    { tag: [t.heading, t.strong, t.meta], color: '#222222', fontWeight: '700' },
    { tag: [t.url, t.escape, t.regexp, t.link, t.quote], color: '#222222' },
    { tag: t.comment, color: '#6a737d', fontFamily: 'consolas' },
    {
      tag: [t.attributeName, t.className, t.propertyName, t.function(t.definition(t.variableName))],
      color: '#6f42c1',
      fontFamily: 'consolas',
    },
    { tag: [t.operator, t.variableName, t.bracket], color: '#222222', fontFamily: 'consolas' },
    { tag: [t.string], color: '#032f62', fontFamily: 'consolas' },
    { tag: [t.number], color: '#005cc5', fontFamily: 'consolas' },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName, t.atom, t.moduleKeyword],
      color: '#d73a49',
      fontFamily: 'consolas',
    },
    { tag: [t.bool, t.special(t.variableName)], color: '#005cc5', fontFamily: 'consolas' },
  ]);

  return [syntaxHighlighting(highlightStyle)];
}
