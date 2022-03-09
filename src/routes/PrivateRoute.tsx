import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useAuth();
  console.log(auth);

  if (auth.isAuthenticating) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() =>
        auth?.user !== null ? children : <Redirect to="/onboarding" />
      }
    ></Route>
  );
};

export default PrivateRoute;
