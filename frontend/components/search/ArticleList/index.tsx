import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';

interface ArticleListProps {
  articles: IArticleBook[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          title={article.title}
          content={article.content}
          nickname={article.book.user.nickname}
          link={`/viewer/${article.book.id}/${article.id}`}
        />
      ))}
    </>
  );
}
