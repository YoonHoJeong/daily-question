import React from "react";
import { Answers, Keywords, Question, Rating, SubmitDone } from "../routes";
import Home from "../routes/Home";
import BottomNavigation from "./BottomNavigation";
import { Header } from "./Header";
import PrivateRoute from "./PrivateRoute";
interface Props {}

const PrivateRoutes: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <PrivateRoute path="/keywords">
        <Keywords></Keywords>
      </PrivateRoute>
      <PrivateRoute path="/question/:qid">
        <Question></Question>
      </PrivateRoute>
      <PrivateRoute path="/rating">
        <Rating></Rating>
      </PrivateRoute>
      <PrivateRoute path="/submit-done">
        <SubmitDone></SubmitDone>
      </PrivateRoute>
      <PrivateRoute path="/answers">
        <Answers></Answers>
      </PrivateRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
      <BottomNavigation />
    </>
  );
};

export default PrivateRoutes;
