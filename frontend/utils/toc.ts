export const parseHeadings = (content: string) => {
  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const headings = content.split('\n').filter((line) => line.includes('# '));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const parsedHeadings = headings
    .filter((heading) => heading.startsWith('#'))
    .map((heading) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = heading.match(/#/g)?.length;

      // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
      if (count) count *= 16;

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return {
        title: heading.split('# ')[1].trim(),
        count,
      };
    });

  return parsedHeadings;
};

export const text2link = (text: string) => {
  return `#${text.replace(/ /g, '-').replace(/[^\uAC00-\uD7A30-9a-zA-Z_-]/g, '')}`;
};
