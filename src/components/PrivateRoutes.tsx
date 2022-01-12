import React from "react";
import { Route } from "react-router-dom";
import {
  Answers,
  Keywords,
  Menu,
  Question,
  Rating,
  SubmitDone,
} from "../routes";
import PrivateRoute from "./PrivateRoute";
interface Props {}

const PrivateRoutes: React.FC<Props> = () => {
  return (
    <>
      <PrivateRoute path="/keywords">
        <Keywords></Keywords>
      </PrivateRoute>
      <PrivateRoute path="/question">
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
      <PrivateRoute path="/">
        <Menu></Menu>
      </PrivateRoute>
    </>
  );
};

export default PrivateRoutes;
