import Image from 'next/image';

import Bookmark from '../../../assets/ico_bookmark.svg';
import Hide from '../../../assets/ico_hide.svg';
import { TextMedium, TextSmall } from '../../../styles/common';
import { TOCBox, TOCsideBar, TOCIcons, TOCtitle, TOCcontainer, TOClist } from './styled';

const sampleData = {
  bookmarkNum: 398,
  bookTitle: '리액트 마스터하기',
  articles: ['Create-react-app', 'JSX'],
};

export default function TOC() {
  return (
    <TOCBox>
      <TOCsideBar>
        <TOCIcons>
          <Image src={Bookmark} alt="Viewer Icon" />
          <Image src={Hide} alt="Viewer Icon" />
        </TOCIcons>
        <TextSmall>{sampleData.bookmarkNum}</TextSmall>
        <TOCtitle>{sampleData.bookTitle}</TOCtitle>

        <TOCcontainer>
          <TextMedium>목차</TextMedium>
          <TOClist>
            {sampleData.articles.map((v, i) => {
              return (
                <TextSmall key={i}>
                  {i + 1}.{v}
                </TextSmall>
              );
            })}
          </TOClist>
        </TOCcontainer>
      </TOCsideBar>
    </TOCBox>
  );
}
