import Image from 'next/image';

import Open from '@assets/ico_open.svg';

import { ClosedSidebarIcons, ClosedSideBarWrapper } from './styled';

interface ClosedSideBarProps {
  onClick: () => void;
}

export default function ClosedSideBar({ onClick }: ClosedSideBarProps) {
  return (
    <ClosedSideBarWrapper>
      <ClosedSidebarIcons>
        <Image src={Open} alt="Viewer Icon" onClick={onClick} />
      </ClosedSidebarIcons>
    </ClosedSideBarWrapper>
  );
}
