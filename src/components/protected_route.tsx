import { Route, Redirect } from "react-router";
import { auth } from "../services/firebase";

const ProtectedRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={() =>
        auth?.currentUser !== null ? children : <Redirect to="/admin" />
      }
    ></Route>
  );
};

export default ProtectedRoute;
