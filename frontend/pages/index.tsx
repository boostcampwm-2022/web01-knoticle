import styled from 'styled-components';

const Test = styled.div`
  width: 100px;
  height: 100px;
  font-size: 5em;
  background-color: red;
`;

const Logo = styled.div`
  font-family: 'Sofia';
`;

export default function AAA() {
  return (
    <Test>
      <Logo>Knoticle</Logo>
      Hi
    </Test>
  );
}
