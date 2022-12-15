const getFirstKeyword = (text: string, keywords: string[]) => {
  const keywordMap = new Map<number, string>();

  keywords.forEach((keyword) => {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase());

    if (index !== -1) keywordMap.set(index, text.slice(index, index + keyword.length));
  });

  if (keywordMap.size === 0) return { keyword: '', index: -1, validKeywords: [] };

  const firstKeywordIndex = Math.min(...Array.from(keywordMap.keys()));
  const firstKeyword = keywordMap.get(firstKeywordIndex);

  return {
    keyword: firstKeyword || '',
    index: firstKeywordIndex,
    validKeywords: Array.from(new Set(keywordMap.values())),
  };
};

export const getTextAfterLastNewLine = (text: string, keywords: string[]) => {
  const { index } = getFirstKeyword(text, keywords);

  const newLineIndex = text.slice(0, index).lastIndexOf('\n');

  return newLineIndex === -1 ? text.slice(0, 200) : text.slice(newLineIndex, newLineIndex + 200);
};

export const highlightKeyword = (text: string, keywords: string[]): React.ReactNode => {
  const { keyword, index, validKeywords } = getFirstKeyword(text, keywords);

  if (index === -1) return text;

  const endIndex = index + keyword.length;

  return (
    <>
      {text.slice(0, index)}
      <b>{keyword}</b>
      {highlightKeyword(text.slice(endIndex), validKeywords)}
    </>
  );
};
