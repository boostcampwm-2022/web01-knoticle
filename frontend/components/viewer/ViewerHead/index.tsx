import Head from 'next/head';

interface ViewerHeadProps {
  articleTitle: string;
  articleContent: string;
}

export default function ViewerHead({ articleTitle, articleContent }: ViewerHeadProps) {
  return (
    <Head>
      <title>{articleTitle}</title>
      <meta name="description" content={articleContent} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={articleTitle} />
      <meta property="og:description" content={articleContent.slice(0, 150)} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.knoticle.app" />
      <meta property="og:image" content="https://kr.object.ncloudstorage.com/j027/knoticle.png" />
    </Head>
  );
}
