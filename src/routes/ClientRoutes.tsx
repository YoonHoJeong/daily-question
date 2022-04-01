import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Header, BottomNavigation } from "../layouts";
import {
  Answers,
  Question,
  SubmitDone,
  Home,
  User,
  Board,
  UserEdit,
} from "../pages";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import sizes from "../layouts/sizes";

interface Props {}

const ClientRoutes: React.FC<Props> = () => {
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
const mainHeight = viewHeight - 108;

const Container = styled.div`
  width: 100vw;
  height: ${viewHeight}px;
  box-sizing: border-box;
`;

const Main = styled.main`
  height: ${mainHeight}px;
  background-color: ${({ theme }) => theme.palette.bgGrey};
`;

export default ClientRoutes;
