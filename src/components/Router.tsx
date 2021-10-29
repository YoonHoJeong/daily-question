import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <div>login</div>
          <Link to="/">to Main</Link>
        </Route>
        <Route path="/">
          <div>main</div>
          <label htmlFor="answerInput">your answer: </label>
          <input id="answerInput" placeholder="답을 입력해주세요" />
          <button>제출</button>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
