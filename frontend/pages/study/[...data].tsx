import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab';
import FAB from '@components/study/FAB';
import UserProfile from '@components/study/UserProfile';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Study() {
  // 파일은 따로 잡기는 했는데 router.query.data에 담겨있는 닉네임을 읽어서
  // API 요청해서 UserProfile에 정보 넘겨줘야 함

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
