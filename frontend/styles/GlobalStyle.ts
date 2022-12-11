import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --title-active-color: #222222;
    --grey-01-color: #595959;
    --grey-02-color: #c2c2c2;
    --light-orange-color: #f5eae0;
    --light-yellow-color: #fffce9;
    --white-color: #fffef9;
    --primary-color: #ca7647;
    --red-color: #f45452;
    --green-color: #94ad2e;    
  }

  body {
    color: var(--title-active-color);
    font-family: 'Noto Sans KR';
    font-weight: 500;
    
  }
    
  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  a {
    color: var(--title-active-color);
    text-decoration: none;
    outline: none
  }

  a:hover, a:active {
    color: var(--title-active-color);
    text-decoration: none;
    background-color: transparent;
  }

`;

export default GlobalStyle;
