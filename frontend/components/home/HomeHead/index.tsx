import Head from 'next/head';

export default function HomeHead() {
  return (
    <Head>
      <title>Knoticle</title>
      <meta name="description" content="모두의 글을 엮어 만드는 나만의 책, 노티클 📒" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Knoticle" />
      <meta property="og:description" content="모두의 글을 엮어 만드는 나만의 책, 노티클 📒" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://knoticle.app" />
      <meta property="og:image" content="https://kr.object.ncloudstorage.com/j027/knoticle.png" />
    </Head>
  );
}
