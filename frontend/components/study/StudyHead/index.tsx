import Head from 'next/head';

interface StudyHeadProps {
  userNickname: string;
  userDescription: string;
  userImage: string;
}

export default function StudyHead({ userNickname, userDescription, userImage }: StudyHeadProps) {
  return (
    <Head>
      <title>{`${userNickname} - Knoticle`}</title>
      <meta name="description" content={`${userDescription}`} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={`${userNickname} - Knoticle`} />
      <meta property="og:description" content={`${userDescription}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://knoticle.app" />
      <meta property="og:image" content={`${userImage}`} />
    </Head>
  );
}
