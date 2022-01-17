import React from "react";
import { Answers, Keywords, Question, Rating, SubmitDone } from "../routes";
import Home from "../routes/Home";
import User from "../routes/User";
import PrivateRoute from "./PrivateRoute";

interface Props {}

const PrivateRoutes: React.FC<Props> = () => {
  return (
    <>
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
      <PrivateRoute path="/user">
        <User />
      </PrivateRoute>
      <PrivateRoute path="/answers">
        <Answers></Answers>
      </PrivateRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </>
  );
};

export default PrivateRoutes;
