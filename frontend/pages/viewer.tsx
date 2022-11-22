import GNB from '@components/common/GNB';
import ArticleContainer from '@components/viewer/ArticleContent';
import TOC from '@components/viewer/TOC';
import { Flex } from '@styles/layout';

export default function Viewer() {
  return (
    <>
      <GNB />
      <Flex>
        <TOC />
        <ArticleContainer />
      </Flex>
    </>
  );
}
