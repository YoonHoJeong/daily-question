import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminLogin from "./AdminLogin";

interface Props {}

const Admin: React.FC<Props> = () => {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        {path}
      </Route>
      <Route path={`${path}/login`}>
        <AdminLogin />
      </Route>
    </Switch>
  );
};

export default Admin;
