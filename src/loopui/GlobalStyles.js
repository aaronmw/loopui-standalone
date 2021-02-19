import { createGlobalStyle } from 'styled-components';
import { COLOR_PALETTE, FONT_SIZES, LINE_HEIGHTS } from './_tokens';

const GlobalStyles = createGlobalStyle`
    * {
        background: unset;
        border: unset;
        box-sizing: border-box;
        color: unset;
        font-size: inherit;
        font: unset;
        line-height: inherit;
        list-style-type: none;
        margin: 0;
        outline: unset;
        padding: 0;
        text-decoration: none;
    }
    :root {
        background-color: white;
        color: ${COLOR_PALETTE['gray--700']};
        font-family: Roboto, sans-serif;
        font-size: ${FONT_SIZES.normal};
        line-height: ${LINE_HEIGHTS.normal};
        scroll-padding: 50px;
    }
`;

export default GlobalStyles;
