import React, { useEffect } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Header, BottomNavigation } from "../layouts";
// import {
//   Answers,
//   Question,
//   SubmitDone,
//   Home,
//   User,
//   Board,
//   UserEdit,
// } from "../pages";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import sizes from "../layouts/sizes";
const Answers = React.lazy(() => import("../pages/Answers/Answers"));
const Question = React.lazy(() => import("../pages/Question/Question"));
const SubmitDone = React.lazy(() => import("../pages/SubmitDone/SubmitDone"));
const Home = React.lazy(() => import("../pages/Home/Home"));
const User = React.lazy(() => import("../pages/User/User"));
const Board = React.lazy(() => import("../pages/Board/Board"));
const UserEdit = React.lazy(() => import("../pages/User/UserEdit"));

interface Props {}

const ClientRoutes: React.FC<Props> = () => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Switch>
          <Route path="/submit-done">
            <ErrorBoundary>
              <SubmitDone />
            </ErrorBoundary>
          </Route>
          <Route path="/board">
            <ErrorBoundary>
              <Board />
            </ErrorBoundary>
          </Route>
          <Route path="/user/edit">
            <ErrorBoundary>
              <UserEdit />
            </ErrorBoundary>
          </Route>
          <Route exact path="/user">
            <ErrorBoundary>
              <User />
            </ErrorBoundary>
          </Route>
          <Route path="/answers">
            <ErrorBoundary>
              <Answers />
            </ErrorBoundary>
          </Route>
          <Route path="/question/:qid">
            <ErrorBoundary>
              <Question />
            </ErrorBoundary>
          </Route>
          <Route path="/">
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          </Route>
        </Switch>
      </Main>

      <BottomNavigation />
    </Container>
  );
};

const viewHeight = window.innerHeight;

const Container = styled.div`
  width: 100vw;
  height: ${viewHeight}px;
  box-sizing: border-box;
`;

const Main = styled.main`
  padding-top: 48px;
  padding-bottom: 60px;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ theme }) => theme.palette.bgGrey};
`;

export default ClientRoutes;
