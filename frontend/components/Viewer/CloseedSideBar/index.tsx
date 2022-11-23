import Image from 'next/image';

import Open from '@assets/ico_open.svg';

import { ClosedSidebarIcons, ClosedSideBarWrapper } from './styled';

interface ClosedSideBarProps {
  handleSideBarOnClick: () => void;
}

export default function ClosedSideBar({ handleSideBarOnClick }: ClosedSideBarProps) {
  return (
    <ClosedSideBarWrapper>
      <ClosedSidebarIcons>
        <Image src={Open} alt="Open Sidebar Icon" onClick={handleSideBarOnClick} />
      </ClosedSidebarIcons>
    </ClosedSideBarWrapper>
  );
}
