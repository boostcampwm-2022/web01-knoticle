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
    const nextBookIndex = (curBookIndex - numberPerPage + bookList.length) % bookList.length;
    setCurBookIndex(nextBookIndex);
    setSliderNumber(Math.floor(nextBookIndex / numberPerPage) + 1);
  };
  const handleRightArrowClick = () => {
    const nextBookIndex = (curBookIndex + numberPerPage) % bookList.length;
    setCurBookIndex(nextBookIndex);
    setSliderNumber(Math.floor(nextBookIndex / numberPerPage) + 1);
  };

  return (
    <SliderWrapper>
      <Image src={LeftArrowIcon} alt="Left Arrow Icon" onClick={handleLeftArrowClick} />

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

        <SliderBookContainer>
          {bookList.length &&
            bookList
              .filter((_, idx) => curBookIndex <= idx && idx < curBookIndex + numberPerPage)
              .concat(
                bookList.filter(
                  (_, idx) =>
                    curBookIndex + numberPerPage > bookList.length &&
                    idx < (curBookIndex + numberPerPage) % bookList.length
                )
              )
              .map((book) => <Book key={book.id} book={book} />)}
        </SliderBookContainer>
      </SliderContent>

      <Image src={RightArrowIcon} alt="Right Arrow Icon" onClick={handleRightArrowClick} />
    </SliderWrapper>
  );
}

export default Slider;
