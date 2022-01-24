import React, { createContext } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import BottomNavigation from "../components/BottomNavigation";
import { Header } from "../components/Header";
import { Answers, Question, SubmitDone } from "../routes";
import Home from "../routes/Home";
import User from "../routes/User";
import Board from "./Board";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f2f2f2;

  box-sizing: border-box;

  padding-top: 90px;
  padding-bottom: 70px;
`;

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
        <Route path="/user">
          <User />
        </Route>
        <Route path="/answers">
          <Answers />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <BottomNavigation />
    </Container>
  );
};

export default ClientRoutes;
