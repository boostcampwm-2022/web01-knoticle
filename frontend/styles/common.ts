import styled from 'styled-components';

const Text = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
`;

export const TextLarge = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`;

export const TextMedium = styled(Text)`
  font-size: 16px;
  line-height: 22px;
`;

export const TextSmall = styled(Text)`
  font-size: 14px;
  line-height: 20px;
`;

export const TextXSmall = styled(Text)`
  font-size: 12px;
  line-height: 16px;
`;

const TextLink = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  color: var(--title-active-color);
`;

export const TextLinkMedium = styled(TextLink)`
  font-size: 16px;
  line-height: 22px;
`;

export const TextLinkSmall = styled(TextLink)`
  font-size: 14px;
  line-height: 20px;
`;

export const TextLinkXSmall = styled(TextLink)`
  font-size: 12px;
  line-height: 16px;
`;
