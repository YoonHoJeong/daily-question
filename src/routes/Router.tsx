import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Register, Onboarding, AdminLogin } from "../pages";
import { AdminRoutes, ClientRoutes, AdminRoute, PrivateRoute } from "./";

interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/onboarding">
          <Onboarding />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dqadmin/login">
          <AdminLogin />
        </Route>
        <AdminRoute path="/dqadmin">
          <AdminRoutes />
        </AdminRoute>
        <PrivateRoute path="/">
          <ClientRoutes />
        </PrivateRoute>
        <Route path="/*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
