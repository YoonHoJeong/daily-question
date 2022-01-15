import React from "react";
import { Router } from "./components/router";
import styled from "styled-components";
import { AuthProvider } from "./hooks/useAuth";
import GlobalStyles from "./components/GlobalStyles";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  box-sizing: border-box;

  padding-top: 50px;
  padding-bottom: 70px;
`;

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Container>
          <Router />
        </Container>
      </AuthProvider>
    </>
  );
};

export default App;
