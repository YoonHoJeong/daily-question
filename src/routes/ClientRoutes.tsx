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

interface Props {}

const ClientRoutes: React.FC<Props> = () => {
  return (
    <Container>
      <Header />
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

      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f2f2f2;

  box-sizing: border-box;

  padding-top: ${({ theme }) => theme.sizes.headerHeight};
  padding-bottom: ${({ theme }) => theme.sizes.bottomNavHeight};
`;

export default ClientRoutes;
