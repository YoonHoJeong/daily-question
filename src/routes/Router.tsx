import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminRoute, PrivateRoute } from "./";
import { Login, Onboarding, Register, AdminLogin } from "../pages";
import { AdminRoutes, ClientRoutes } from "./";

// const Onboarding = React.lazy(
//   () => import("../pages/Onboarding/Onboarding")
// );
// const Login = React.lazy(() => import("../pages/Login/Login"));
// const Register = React.lazy(() => import("../pages/Register/Register"));
// const AdminLogin = React.lazy(() => import("../pages/Admin/AdminLogin"));
// const AdminRoutes = React.lazy(() => import("./AdminRoutes"));
// const ClientRoutes = React.lazy(() => import("./ClientRoutes"));

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback="loading...">
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
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
