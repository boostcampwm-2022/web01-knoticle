export const text2link = (text: string) => {
  return `#${text
    .replace(/ /g, '-')
    .replace(/[^\uAC00-\uD7A30-9a-zA-Z_-]/g, '')
    .toLowerCase()}`;
};

export const parseHeadings = (content: string) => {
  const headings = content
    .split('\n')
    .filter((line) => /^\s*#{1,3}/m.test(line))
    .map((line) => {
      return {
        text: line.trim().split('# ')[1],
        length: line.match(/#/g)?.length || 0,
      };
    });

  const parsedHeadings = headings.map(({ text, length }, index) => {
    const currHeadingIndex = headings
      .slice(0, index)
      .reduce((count, { text: currText }) => (currText === text ? count + 1 : count), 0);

    return {
      heading: text,
      link: `${text2link(text)}${currHeadingIndex ? `-${currHeadingIndex}` : ``}`,
      padding: length * 16,
    };
  });

  return parsedHeadings;
};
