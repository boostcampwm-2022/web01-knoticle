const getFirstKeyword = (text: string, keywords: string[]) => {
  const keywordMap = new Map<number, string>();

  keywords.forEach((keyword) => {
    const index = text.toLowerCase().indexOf(keyword.toLowerCase());

    if (index !== -1) keywordMap.set(index, keyword);
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

  return newLineIndex === -1 ? text : text.slice(newLineIndex);
};

export const highlightKeyword = (text: string, keywords: string[], length = 0): React.ReactNode => {
  if (length > 200) return '';

  const { keyword, index, validKeywords } = getFirstKeyword(text, keywords);

  if (index === -1) return text;

  const endIndex = index + keyword.length;

  const affixText = text.slice(0, index);

  const accumulatedLength = length + affixText.length + keyword.length;

  return (
    <>
      {affixText}
      <b>{keyword}</b>
      {highlightKeyword(text.slice(endIndex), validKeywords, accumulatedLength)}
    </>
  );
};
