import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "../app";
import { Admin } from "../routes/admin";
import Login from "../routes/login";
import { MyAnswers } from "../routes/my_answers";
import { SelectCategory } from "../routes/select_category";
import { SubmitDone } from "../routes/submit_done";
import { TodayQuestion } from "../routes/today_question";

interface Props {}

const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => (auth?.user !== null ? children : <Redirect to="/" />)}
    ></Route>
  );
};

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
        <Route path="/admin">
          <Admin />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
