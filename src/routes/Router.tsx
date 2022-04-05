import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoadScreen } from "../components/common";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { AdminRoute, PrivateRoute } from "./";

const Onboarding = React.lazy(() => import("../pages/Onboarding/Onboarding"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const AdminLogin = React.lazy(() => import("../pages/Admin/AdminLogin"));
const AdminRoutes = React.lazy(() => import("./AdminRoutes"));
const ClientRoutes = React.lazy(() => import("./ClientRoutes"));

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadScreen />}>
        <Switch>
          <Route path="/onboarding">
            <ErrorBoundary>
              <Onboarding />
            </ErrorBoundary>
          </Route>
          <Route path="/login">
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Route>
          <Route path="/register">
            <ErrorBoundary>
              <Register />
            </ErrorBoundary>
          </Route>
          <Route path="/dqadmin/login">
            <ErrorBoundary>
              <AdminLogin />
            </ErrorBoundary>
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
