import Image from 'next/image';

import ArticleIcon from '../../../assets/ico_article.svg';
import PersonIcon from '../../../assets/ico_person.svg';
import SearchIcon from '../../../assets/ico_search.svg';
import { GNBbar, IconsContainer, Logo } from './styled';

export default function GNB() {
  return (
    <GNBbar>
      <IconsContainer />
      <Logo>knoticle</Logo>
      <IconsContainer>
        <Image src={ArticleIcon} alt="Article Icon" />
        <Image src={PersonIcon} alt="Person Icon" />
        <Image src={SearchIcon} alt="Search Icon" />
      </IconsContainer>
    </GNBbar>
  );
}
