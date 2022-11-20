import GNB from '../components/common/GNB';
import BookListTab from '../components/study/BookListTab.tsx';
import UserProfile from '../components/study/UserProfile';
import { FlexCenterPositioner } from '../styles/layout';

export default function Study() {
  return (
    <>
      <GNB />
      <FlexCenterPositioner>
        <UserProfile />
        <BookListTab />
      </FlexCenterPositioner>
    </>
  );
}
