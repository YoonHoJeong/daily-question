import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BottomNavigation from "./BottomNavigation";
import { Header } from "./Header";

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useAuth();

  if (auth?.isAuthenticating) {
    return <>loading...</>;
  }

  return (
    <Route
      {...rest}
      render={() =>
        auth?.user !== null ? (
          <>
            <Header />
            {children}
            <BottomNavigation />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
