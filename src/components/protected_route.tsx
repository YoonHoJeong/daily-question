import { CircularProgress } from "@mui/material";
import { Route, Redirect } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const auth = useAuth();

  if (auth!!.isAuthenticating) {
    return <CircularProgress />;
  }

  return (
    <Route
      {...rest}
      render={() => (auth?.user !== null ? children : <Redirect to="/admin" />)}
    ></Route>
  );
};

export default ProtectedRoute;
