import Image from 'next/image';

import React, { useEffect, useState } from 'react';

import LeftArrowIcon from '@assets/ico_arrow_left.svg';
import RightArrowIcon from '@assets/ico_arrow_right.svg';
import ListIcon from '@assets/ico_flower.svg';
import Book from '@components/common/Book';
import SkeletonBook from '@components/common/SkeletonBook';
import useSessionStorage from '@hooks/useSessionStorage';
import { IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

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
  const {
    value: curBookIndex,
    isValueSet: isCurBookIndexSet,
    setValue: setCurBookIndex,
  } = useSessionStorage(`${title}_curBookIndex`, 0);

  const {
    value: sliderNumber,
    isValueSet: isSliderNumberSet,
    setValue: setSliderNumber,
  } = useSessionStorage(`${title}_sliderNumber`, 1);

  const [touchPositionX, setTouchPositionX] = useState(0);

  const SkeletonList = Array.from({ length: numberPerPage }, (_, i) => i + 1);

  const sliderIndicatorCount = bookList ? Math.ceil(bookList.length / numberPerPage) : 0;
  const sliderIndicatorNumbersList = Array.from({ length: sliderIndicatorCount }, (_, i) => i + 1);

  const handleLeftArrowClick = () => {
    setCurBookIndex(curBookIndex - numberPerPage);
    setSliderNumber(sliderNumber - 1);
  };

  const handleRightArrowClick = () => {
    setCurBookIndex(curBookIndex + numberPerPage);
    setSliderNumber(sliderNumber + 1);
  };

  const handleSliderTrackTouchStart = (e: React.TouchEvent) => {
    setTouchPositionX(e.changedTouches[0].pageX);
  };

  const handleSliderTrackTouchEnd = (e: React.TouchEvent) => {
    const distanceX = touchPositionX - e.changedTouches[0].pageX;
    if (distanceX > 30 && sliderNumber !== sliderIndicatorCount) {
      handleRightArrowClick();
    }
    if (distanceX < -30 && sliderNumber !== 1) {
      handleLeftArrowClick();
    }
  };

  useEffect(() => {
    if (!bookList) return;

    const newSliderNum = setNumBetween(
      Math.round(curBookIndex / numberPerPage) + 1,
      1,
      sliderIndicatorCount
    );

    setSliderNumber(newSliderNum);
    setCurBookIndex((newSliderNum - 1) * numberPerPage);
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
          {!isLoading && isCurBookIndexSet && isSliderNumberSet ? (
            <SliderTrack
              curBookIndex={curBookIndex}
              onTouchStart={handleSliderTrackTouchStart}
              onTouchEnd={handleSliderTrackTouchEnd}
            >
              {bookList.map((book) => (
                <SliderBookWrapper key={book.id} numberPerPage={numberPerPage}>
                  <Book book={book} />
                </SliderBookWrapper>
              ))}
            </SliderTrack>
          ) : (
            <Flex>
              {SkeletonList.map((key) => (
                <SkeletonBook key={key} />
              ))}
            </Flex>
          )}
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
