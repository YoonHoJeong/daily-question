import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { AuthProvider } from "./hooks/useAuth";
import { Router } from "./components/Router";
import GlobalStyle from "./css/GlobalStyle";

const Container = styled.div``;

const palette = {
  white: "#FFFFFF",
  blue: "#515FA9",
  black: "#4D4D4D",
  grey: "#CCCCCC",
  bgGrey: "#F2F2F2",
  bgGrey2: "#E5E5E5",
  deepGrey: "#888888",
  red: "#FF7676",
};

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <ThemeProvider theme={{ palette }}>
        <GlobalStyle />
        <AuthProvider>
          <Container>
            <Router />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
