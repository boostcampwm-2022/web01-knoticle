import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';

interface ArticleListProps {
  keyword: string;
  articles: IArticleBook[];
}

export default function ArticleList({ keyword, articles }: ArticleListProps) {
  return (
    <>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          keyword={keyword}
          title={article.title}
          content={article.content}
          nickname={article.book.user.nickname}
        />
      ))}
    </>
  );
}
