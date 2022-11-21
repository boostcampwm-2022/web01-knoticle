import Footer from '@components/common/Footer';
import GNB from '@components/common/GNB';
import Slider from '@components/Slider';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Home() {
  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          <Slider />
          <Slider />
          <Footer />
        </PageInnerLarge>
      </PageWrapper>
    </>
  );
}
