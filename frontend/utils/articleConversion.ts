import { html2markdown } from './parser';

export const articleToc = (content: string) => {
  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = html2markdown(content)
    .split(`\n`)
    .filter((t) => t.includes('# '));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter((str) => str[0] === '#')
    .map((item) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count *= 10;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return { title: item.split('# ')[1].replace(/`/g, '').trim(), count };
    });

  return result;
};

export const articleConversion = (content: string) => {
  const newArticle = content.split('\n').map((v, idx) => {
    if (v.includes('h1') || v.includes('h2') || v.includes('h3')) {
      const title = v.replace(/<[^>]*>?/g, '');
      const result = v.split('');
      result.splice(3, 0, ' ', `id="${title}"`);
      return result.join('');
    }
    return v;
  });

  return newArticle.join('\n');
};
