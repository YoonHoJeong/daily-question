import { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../app";

const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => (auth?.user !== null ? children : <Redirect to="/" />)}
    ></Route>
  );
};

export default PrivateRoute;
