import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import BottomNavigation from "../components/BottomNavigation";
import { Header } from "../components/Header";
import { Answers, Question, SubmitDone } from "../routes";
import Home from "../routes/Home";
import User from "../routes/User";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f2f2f2;

  box-sizing: border-box;

  padding: 0px 40px;
  padding-top: 90px;
  padding-bottom: 70px;
`;

interface Props {}

const ClientRoutes: React.FC<Props> = () => {
  return (
    <Container>
      <Header />
      <Switch>
        <Route path="/question/:qid">
          <Question />
        </Route>
        <Route path="/submit-done">
          <SubmitDone />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/answers">
          <Answers />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <BottomNavigation />
    </Container>
  );
};

export default ClientRoutes;
