import Image from 'next/image';

import { useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import { Book as BookData } from '@interfaces';

import {
  SliderContent,
  SliderInfo,
  SliderTitle,
  SliderWrapper,
  SliderIndicatorContainer,
  SliderIndicator,
  SliderBookContainer,
  SliderInfoContainer,
  SliderIcon,
} from './styled';

interface SliderProps {
  bookList: BookData[];
  title: string;
}

function Slider({ bookList, title }: SliderProps) {
  const [curBookIndex, setCurBookIndex] = useState(0);
  const [sliderNumber, setSliderNumber] = useState(1);

  const numberPerPage = 4;
  const sliderIndicatorCount = Math.ceil(bookList.length / numberPerPage);
  const sliderIndicatorNumbersList = Array.from({ length: sliderIndicatorCount }, (_, i) => i + 1);

  const handleLeftArrowClick = () => {
    setCurBookIndex(curBookIndex - numberPerPage);
    setSliderNumber(sliderNumber - 1);
  };
  const handleRightArrowClick = () => {
    setCurBookIndex(curBookIndex + numberPerPage);
    setSliderNumber(sliderNumber + 1);
  };

  return (
    <SliderWrapper>
      <SliderIcon
        src={LeftArrowIcon}
        alt="Left Arrow Icon"
        onClick={handleLeftArrowClick}
        isVisible={sliderNumber !== 1}
      />

      <SliderContent>
        <SliderInfoContainer>
          <SliderInfo>
            <Image src={ListIcon} alt="List Icon" />
            <SliderTitle>{title}</SliderTitle>
          </SliderInfo>
          <SliderIndicatorContainer>
            {sliderIndicatorNumbersList.map((number) => {
              return <SliderIndicator key={number} isActive={number === sliderNumber} />;
            })}
          </SliderIndicatorContainer>
        </SliderInfoContainer>

        <SliderBookContainer curBookIndex={curBookIndex}>
          {bookList.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </SliderBookContainer>
      </SliderContent>

      <SliderIcon
        src={RightArrowIcon}
        alt="Right Arrow Icon"
        onClick={handleRightArrowClick}
        isVisible={sliderNumber !== sliderIndicatorCount}
      />
    </SliderWrapper>
  );
}

export default Slider;
