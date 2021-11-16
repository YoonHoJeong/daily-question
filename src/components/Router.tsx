import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Admin } from "../routes/admin";
import { AdminLogin } from "../routes/admin_login";
import { AdminMain } from "../routes/admin_main";

import Login from "../routes/login";
import { MyAnswers } from "../routes/my_answers";
import { SelectCategory } from "../routes/select_category";
import { SubmitDone } from "../routes/submit_done";
import { TodayQuestion } from "../routes/today_question";
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
        <PrivateRoute path="/submit-done">
          <SubmitDone />
        </PrivateRoute>
        <PrivateRoute path="/my-answers">
          <MyAnswers />
        </PrivateRoute>
        <ProtectedRoute path="/admin/main">
          <AdminMain />
        </ProtectedRoute>
        <Route path="/admin">
          <AdminLogin />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
