import Image from 'next/image';

import { useEffect, useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import SkeletonBook from '@components/common/SkeletonBook';
import { IBookScraps } from '@interfaces';

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
  SliderTrack,
  SliderBookWrapper,
} from './styled';

interface SliderProps {
  bookList: IBookScraps[];
  title: string;
  isLoading: boolean;
  numberPerPage: number;
}

const setNumBetween = (val: number, min: number, max: number) => {
  if (val < min) return min;
  if (val > max) return max;
  return val;
};

function Slider({ bookList, title, isLoading, numberPerPage }: SliderProps) {
  const [curBookIndex, setCurBookIndex] = useState(0);
  const [sliderNumber, setSliderNumber] = useState(1);

  const SkeletonList = Array.from({ length: numberPerPage }, (_, i) => i + 1);

  const sliderIndicatorCount = bookList ? Math.ceil(bookList.length / numberPerPage) : 0;
  const sliderIndicatorNumbersList = Array.from({ length: sliderIndicatorCount }, (_, i) => i + 1);

  const handleLeftArrowClick = () => {
    setCurBookIndex(setNumBetween(curBookIndex - numberPerPage, 0, bookList.length - 1));
    setSliderNumber(setNumBetween(sliderNumber - 1, 1, sliderIndicatorCount));
  };

  const handleRightArrowClick = () => {
    setCurBookIndex(setNumBetween(curBookIndex + numberPerPage, 0, bookList.length - 1));
    setSliderNumber(setNumBetween(sliderNumber + 1, 1, sliderIndicatorCount));
  };

  useEffect(() => {
    if (!bookList) return;

    const newSliderNum = Math.round(curBookIndex / numberPerPage) + 1;

    setSliderNumber(setNumBetween(newSliderNum, 1, sliderIndicatorCount));
    setCurBookIndex(setNumBetween((newSliderNum - 1) * numberPerPage, 0, bookList.length - 1));
  }, [numberPerPage]);

  return (
    <SliderWrapper>
      <SliderIcon
        src={LeftArrowIcon}
        alt="Left Arrow Icon"
        onClick={handleLeftArrowClick}
        isvisible={(sliderNumber !== 1).toString()}
      />

      <SliderContent numberPerPage={numberPerPage}>
        <SliderInfoContainer>
          <SliderInfo>
            <Image src={ListIcon} alt="List Icon" />
            <SliderTitle>{title}</SliderTitle>
          </SliderInfo>
          {numberPerPage !== 1 && (
            <SliderIndicatorContainer>
              {sliderIndicatorNumbersList.map((number) => {
                return <SliderIndicator key={number} isActive={number === sliderNumber} />;
              })}
            </SliderIndicatorContainer>
          )}
        </SliderInfoContainer>

        <SliderBookContainer>
          <SliderTrack curBookIndex={curBookIndex}>
            {isLoading
              ? SkeletonList.map((key) => <SkeletonBook key={key} />)
              : bookList.map((book) => (
                  <SliderBookWrapper key={book.id} numberPerPage={numberPerPage}>
                    <Book book={book} />
                  </SliderBookWrapper>
                ))}
          </SliderTrack>
        </SliderBookContainer>
      </SliderContent>

      <SliderIcon
        src={RightArrowIcon}
        alt="Right Arrow Icon"
        onClick={handleRightArrowClick}
        isvisible={(sliderNumber !== sliderIndicatorCount).toString()}
      />
    </SliderWrapper>
  );
}

export default Slider;
