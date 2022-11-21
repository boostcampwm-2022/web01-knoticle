import Footer from '@components/common/Footer';
import GNB from '@components/common/GNB';
import Slider from '@components/Slider';
import { FlexColumnCenter } from '@styles/layout';

export default function Home() {
  return (
    <FlexColumnCenter style={{ backgroundColor: '#fffce9' }}>
      <GNB />
      <Slider />
      <Slider />
      <Footer />
    </FlexColumnCenter>
  );
}
