import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
