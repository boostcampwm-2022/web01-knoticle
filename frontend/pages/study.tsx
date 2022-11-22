import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab.tsx';
import FAB from '@components/study/FAB';
import UserProfile from '@components/study/UserProfile';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Study() {
  return (
    <>
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          <UserProfile />
          <BookListTab />
        </PageInnerLarge>
        <FAB />
      </PageWrapper>
    </>
  );
}
