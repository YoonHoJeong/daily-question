import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        font-family: 'Noto Sans KR', sans-serif;
        font-family: 'Roboto', sans-serif;
        box-sizing:border-box;
    }
`;

export default GlobalStyle;
