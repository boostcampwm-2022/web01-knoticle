import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import { getScrapsApi } from '@apis/scrapApi';

export default function SiteMapXML() {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const scraps = await getScrapsApi();

  const lastmod = new Date().toISOString();

  const defaultFields = [
    {
      loc: `${process.env.NEXT_PUBLIC_NEXT_URL}`,
      changefreq: 'daily',
      priority: '1.0',
      lastmod,
    },
  ];

  const scrapFields = scraps.map((scrap: { book_id: number; article_id: number }) => ({
    loc: `${process.env.NEXT_PUBLIC_NEXT_URL}/viewer/${scrap.book_id}/${scrap.article_id}`,
    changefreq: 'daily',
    priority: '1.0',
    lastmod,
  }));

  const fields = [...defaultFields, ...scrapFields];

  return getServerSideSitemap(context, fields);
};
