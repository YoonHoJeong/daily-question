import React from "react";
import styled from "styled-components";
import { AuthProvider } from "./hooks/useAuth";
import { Router } from "./components/Router";
import GlobalStyle from "./css/GlobalStyle";

const Container = styled.div``;

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Container>
          <Router />
        </Container>
      </AuthProvider>
    </>
  );
};

export default App;
