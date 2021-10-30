import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Login } from "../routes/login";
import { SelectCategory } from "../routes/select_category";
import { SubmitDone } from "../routes/submit_done";
import { TodayQuestion } from "../routes/today_question";

interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/select-category">
          <SelectCategory />
        </Route>
        <Route path="/todoy-question">
          <TodayQuestion />
        </Route>
        <Route path="/submit-done">
          <SubmitDone />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
