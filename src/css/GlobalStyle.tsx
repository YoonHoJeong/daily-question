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
        color: #4D4D4D;
        box-sizing:border-box;
    }
`;

export default GlobalStyle;
