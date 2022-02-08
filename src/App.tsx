import React, { createContext } from "react";
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

const sizes = {
  headerHeight: "60px",
  bottomNavHeight: "84px",
};

const globalVariables = {
  board: "둘러보기",
  todayQuestions: "오늘의 질문",
  user: "내 정보",
  keeps: "담아두기",
  myAnswers: "나의 답변",
  userEdit: "프로필 편집",
};

interface GlobalVariables {
  board: string;
  todayQuestions: string;
  user: string;
  keeps: string;
  myAnswers: string;
  userEdit: string;
}

export const VariablesContext = createContext<GlobalVariables>(globalVariables);

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <ThemeProvider theme={{ palette, sizes }}>
        <GlobalStyle />
        <VariablesContext.Provider value={globalVariables}>
          <AuthProvider>
            <Container>
              <Router />
            </Container>
          </AuthProvider>
        </VariablesContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
