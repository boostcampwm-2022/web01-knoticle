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
}

function Slider({ bookList, title, isLoading }: SliderProps) {
  const [curBookIndex, setCurBookIndex] = useState(0);
  const [sliderNumber, setSliderNumber] = useState(1);
  const [numberPerPage, setNumberPerPage] = useState(4);

  // const numberPerPage = 4;
  const SkeletonList = Array.from({ length: 12 }, (_, i) => i + 1);

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

  const resizingHandler = () => {
    console.log(window.innerWidth);
    switch (true) {
      case window.innerWidth < 576:
        setNumberPerPage(1);
        break;
      case window.innerWidth < 992:
        setNumberPerPage(2);
        break;
      case window.innerWidth < 1200:
        setNumberPerPage(3);
        break;
      default:
        setNumberPerPage(4);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizingHandler);

    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  return (
    <SliderWrapper>
      <SliderIcon
        src={LeftArrowIcon}
        alt="Left Arrow Icon"
        onClick={handleLeftArrowClick}
        isvisible={(sliderNumber !== 1).toString()}
      />

      <SliderContent>
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
                  <SliderBookWrapper key={book.id}>
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
