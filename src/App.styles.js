import { injectGlobal } from 'styled-components'

/**
 * Global styles
 *
 * Note: this is deprecated in StyledComponents v4, however v4 is still in active development at the time of writing
 * Once v4 is available as an rc or stable release injectGlobal should be replaced with createGlobalStyle:
 * https://www.styled-components.com/docs/api#createglobalstyle
 */
const GlobalStyle = injectGlobal`
  html {
    font-size: 62.5%;
    min-height: 100%;
  }
  
  html,
  body,
  #root {
    height: 100%;
  }
  
  body {
    font-size: 1.6rem;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  /* Normalize */
  button,
  input {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  button,
  input {
    overflow: visible;
  }
`;

export default GlobalStyle;
