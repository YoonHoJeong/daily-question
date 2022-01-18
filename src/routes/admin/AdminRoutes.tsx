import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Admin } from "..";
import AdminLogin from "./AdminLogin";

interface Props {}

const AdminRoutes: React.FC<Props> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`}>
        <AdminLogin />
      </Route>
      <Route exact path={`${path}`}>
        <Admin />
      </Route>
    </Switch>
  );
};

export default AdminRoutes;
