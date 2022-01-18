import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

interface Props {}

const Admin: React.FC<Props> = () => {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        {path}
      </Route>
    </Switch>
  );
};

export default Admin;
