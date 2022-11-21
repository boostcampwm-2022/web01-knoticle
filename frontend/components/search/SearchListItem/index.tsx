import Image from 'next/image';

import TemporaryImage from '../../../assets/img_profile.png';
import { TextSmall, TextXSmall } from '../../../styles/common';
import {
  ItemContent,
  ItemGroup,
  ItemTitle,
  ItemWrapper,
  ProfileDescription,
  ProfileImage,
  UserProfile,
} from './styled';

export default function SearchListItem() {
  return (
    <ItemWrapper>
      <ItemGroup>
        <ItemTitle>리액트 개발 환경 세팅하기</ItemTitle>
        <ItemContent>
          그럼 리액트를 사용하기 위한 개발 환경을 세팅해보자. 대부분의 블로그에서 리액트와 함께
          Webpack, Babel을 함께 소개하는 경우가 많다. 하지만 입문자 입장에서는 리액트만으로도
          공부하기 벅차기 때문에 본 글에서는 내용을 공부하기 벅차기 때문에
          가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사
        </ItemContent>
      </ItemGroup>
      <UserProfile>
        <ProfileDescription>
          <TextXSmall>Written By</TextXSmall>
          <TextSmall>Web01</TextSmall>
        </ProfileDescription>
        <ProfileImage>
          <Image src={TemporaryImage} alt="profile" width={72} height={72} />
        </ProfileImage>
      </UserProfile>
    </ItemWrapper>
  );
}
