import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../routes";
import PrivateRoutes from "./PrivateRoutes";

interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoutes />

        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
