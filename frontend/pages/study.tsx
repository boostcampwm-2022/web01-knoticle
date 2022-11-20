import GNB from '../components/common/GNB';
import BookListTab from '../components/study/BookListTab.tsx';
import FAB from '../components/study/FAB';
import UserProfile from '../components/study/UserProfile';
import { FlexCenterPositioner, PageColorWrapper } from '../styles/layout';

export default function Study() {
  return (
    <>
      <GNB />
      <PageColorWrapper>
        <FlexCenterPositioner>
          <UserProfile />
          <BookListTab />
        </FlexCenterPositioner>
        <FAB />
      </PageColorWrapper>
    </>
  );
}
