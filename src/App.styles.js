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
  }
  
  body {
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
