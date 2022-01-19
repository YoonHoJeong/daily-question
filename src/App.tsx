import React from "react";
import styled from "styled-components";
import { AuthProvider } from "./hooks/useAuth";
import GlobalStyles from "./components/GlobalStyles";
import { Router } from "./components/Router";

const Container = styled.div``;

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
