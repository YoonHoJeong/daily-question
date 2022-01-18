import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {}

const AdminRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useAuth();

  if (!auth) {
    return <>404 not found</>;
  }

  if (auth.isAuthenticating) {
    return <>loading...</>;
  }
  if (!auth.user?.admin) {
    return <Redirect to="/dqadmin/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default AdminRoute;
