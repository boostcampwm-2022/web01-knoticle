import GNB from '../components/common/GNB';
import ArticleContainer from '../components/Viewer/ArticleContent';
import TOC from '../components/Viewer/TOC';
import { Flex } from '../styles/layout';

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
