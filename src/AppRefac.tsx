import React from "react";
import { Router } from "./components/router";
import styled from "styled-components";
// import {} from "styled-components/cssprop";

const App = styled.div`
  width: 100vw;
  height: 100vh;
`;

interface Props {}

const AppRefac: React.FC<Props> = () => {
  return (
    <App>
      <Router></Router>
    </App>
  );
};

export default AppRefac;
