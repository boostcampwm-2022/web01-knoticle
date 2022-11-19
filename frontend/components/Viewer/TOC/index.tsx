import Image from 'next/image';

import Bookmark from '../../../assets/ico_bookmark.svg';
import Hide from '../../../assets/ico_hide.svg';
import SampleProflie from '../../../assets/ico_sampleProfile.svg';
import { TextMedium, TextSmall } from '../../../styles/common';
import {
  TOCBox,
  TOCsideBar,
  TOCIcons,
  TOCtitle,
  TOCcontainer,
  TOClist,
  TOCproflie,
  TOCproflieText,
  TOCImgBox,
} from './styled';

const sampleData = {
  bookmarkNum: 398,
  bookTitle: '리액트 마스터하기',
  articles: ['Create-react-app', 'JSX'],
  username: 'Web01',
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
      <TOCproflie>
        <TOCproflieText>
          <TextSmall>Written by</TextSmall>
          <TextMedium>{sampleData.username}</TextMedium>
        </TOCproflieText>
        <TOCImgBox>
          <Image src={SampleProflie} alt="Viewer Icon" width={75} height={75} />
        </TOCImgBox>
      </TOCproflie>
    </TOCBox>
  );
}
