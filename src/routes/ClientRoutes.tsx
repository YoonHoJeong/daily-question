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

interface Props {}

const ClientRoutes: React.FC<Props> = () => {
  return (
    <Container>
      <Header />
      <Switch>
        <Route path="/submit-done">
          <SubmitDone />
        </Route>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/user/edit">
          <UserEdit />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
        <Route path="/answers">
          <Answers />
        </Route>
        <Route path="/question/:qid">
          <Question />
        </Route>
        <Route path="/">
          <Home />
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
