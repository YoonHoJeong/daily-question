import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AdminLogin } from "../routes/admin/admin_login";
import { AdminMain } from "../routes/admin/admin_main";

import Keywords from "../routes/keywords";
import Login from "../routes/login";
import MyAnswers from "../routes/my_answers";
import RatingPage from "../routes/rating";
import SelectCategory from "../routes/select_category";
import SubmitDone from "../routes/submit_done";
import TodayQuestion from "../routes/today_question";
import PrivateRoute from "./private_route";
import ProtectedRoute from "./protected_route";
interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/select-category">
          <SelectCategory />
        </PrivateRoute>
        <PrivateRoute path="/today-question">
          <TodayQuestion />
        </PrivateRoute>
        <PrivateRoute path="/rating">
          <RatingPage />
        </PrivateRoute>
        <PrivateRoute path="/submit-done">
          <SubmitDone />
        </PrivateRoute>
        <PrivateRoute path="/my-answers">
          <MyAnswers />
        </PrivateRoute>
        <PrivateRoute path="/keywords">
          <Keywords />
        </PrivateRoute>
        <Route path="/admin/login">
          <AdminLogin />
        </Route>
        <ProtectedRoute path="/admin">
          <AdminMain />
        </ProtectedRoute>

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
