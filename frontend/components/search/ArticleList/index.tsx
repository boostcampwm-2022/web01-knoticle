import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';
import { markdown2text } from '@utils/parser';

interface ArticleListProps {
  articles: IArticleBook[];
  keywords: string[];
}

export default function ArticleList({ articles, keywords }: ArticleListProps) {
  const highlightWord = (text: string, words: string[], isFirst = false): React.ReactNode => {
    let wordIndexList = words.map((word) => text.toLowerCase().indexOf(word.toLowerCase()));

    const filteredWords = words.filter((_, index) => wordIndexList[index] !== -1);
    wordIndexList = wordIndexList.filter((wordIndex) => wordIndex !== -1);

    if (wordIndexList.length === 0) return text;

    const startIndex = Math.min(...wordIndexList);

    const targetWord = filteredWords[wordIndexList.indexOf(startIndex)];

    const endIndex = startIndex + targetWord.length;

    let paddingIndex = 0;

    if (isFirst) {
      const regex = /\n/g;

      while (regex.test(text.slice(0, startIndex))) paddingIndex = regex.lastIndex;
    }

    return (
      <>
        {text.slice(paddingIndex, startIndex)}
        <b>{text.slice(startIndex, endIndex)}</b>
        {highlightWord(text.slice(endIndex), words)}
      </>
    );
  };

  return (
    <>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          title={highlightWord(article.title, keywords)}
          content={highlightWord(markdown2text(article.content), keywords, true)}
          nickname={article.book.user.nickname}
          profileImage={article.book.user.profile_image}
          articleUrl={`/viewer/${article.book.id}/${article.id}`}
          studyUrl={`/study/${article.book.user.nickname}`}
        />
      ))}
    </>
  );
}
