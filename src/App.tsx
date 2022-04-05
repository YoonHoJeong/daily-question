import React, { createContext } from "react";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./routes/Router";
import GlobalStyle from "./assets/css/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

interface Props {}

export const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ palette, sizes }}>
        <GlobalStyle />
        <VariablesContext.Provider value={globalVariables}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </AuthProvider>
        </VariablesContext.Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

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
  headerPadding: "20px",
  headerBorder: "4px",
  bottomNavHeight: "84px",
};

const globalVariables = {
  board: "둘러보기",
  todayQuestions: "오늘의 질문",
  user: "나의 묻다",
  keeps: "담아두기",
  myAnswers: "나의 답변",
  userEdit: "프로필 편집",
  userKeeps: "담아두기",
  pathnames: {
    "/board": "둘러보기",
    "/user/keeps": "마음함",
    "/user/edit": "프로필 편집",
    "/user": "나의 묻다",
    "/answers": "돌아보기",
    "/answers/daily": "돌아보기(일간)",
    "/answers/weekly": "돌아보기(주간)",
    "/answers/monthly": "돌아보기(월간)",
    "/questions": "오늘의 질문",
    "/": "오늘의 질문",
  },
};

interface GlobalVariables {
  board: string;
  todayQuestions: string;
  user: string;
  keeps: string;
  myAnswers: string;
  userEdit: string;
  userKeeps: string;
  pathnames: {
    [pathname: string]: string;
  };
}

export const VariablesContext = createContext<GlobalVariables>(globalVariables);

export default App;
