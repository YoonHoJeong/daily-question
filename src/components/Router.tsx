import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../routes";
import AdminLogin from "../routes/admin/AdminLogin";
import AdminRoutes from "../routes/admin/AdminRoutes";
import ClientRoutes from "../routes/ClientRoutes";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

interface Props {}

export const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
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
        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
