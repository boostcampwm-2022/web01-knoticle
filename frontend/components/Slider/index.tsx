import Image from 'next/image';

import { useState } from 'react';

import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import { FlexSpaceBetween } from '@styles/layout';

import {
  SliderContent,
  SliderInfo,
  SliderTitle,
  SliderWrapper,
  SliderIndicatorContainer,
  SliderIndicator,
  SliderBookContainer,
} from './styled';

function Slider() {
  const [sliderNumber, setSliderNumber] = useState(1);

  const sliderIndicatorCount = 4;
  const sliderIndicatorNumbersList = Array.from({ length: sliderIndicatorCount }, (_, i) => i + 1);

  const handleRightArrowClick = () => {
    setSliderNumber(sliderNumber === sliderIndicatorCount ? 1 : sliderNumber + 1);
  };

  return (
    <SliderWrapper>
      <SliderContent>
        <FlexSpaceBetween>
          <SliderInfo>
            <Image src={ListIcon} alt="List Icon" />
            <SliderTitle>새로 엮은 책</SliderTitle>
          </SliderInfo>
          <SliderIndicatorContainer>
            {sliderIndicatorNumbersList.map((number) => {
              return <SliderIndicator key={number} sliderNumber={sliderNumber} number={number} />;
            })}
          </SliderIndicatorContainer>
        </FlexSpaceBetween>

        <SliderBookContainer>
          <Book />
          <Book />
          <Book />
          <Book />
        </SliderBookContainer>
      </SliderContent>

      <Image src={RightArrowIcon} alt="Right Arrow Icon" onClick={handleRightArrowClick} />
    </SliderWrapper>
  );
}

export default Slider;
