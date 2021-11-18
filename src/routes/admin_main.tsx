import React from "react";
import { Route, Switch, useLocation } from "react-router";

import { AdminHeader } from "../components/admin_header";
import { AdminAnswers } from "./admin_answers";
import { EnrollQuestion } from "./admin_enroll_question";
import { AdminEnrollUser } from "./admin_enroll_user";
import styles from "./admin_main.module.css";

interface Props {}

export const AdminMain: React.FC<Props> = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className={styles.adminMain}>
      <AdminHeader />
      <Switch>
        <Route exact path={`/admin/main`}>
          <AdminAnswers />
        </Route>
        <Route exact path={`/admin/enroll-question`}>
          <EnrollQuestion />
        </Route>
        <Route exact path={`/admin/enroll-user`}>
          <AdminEnrollUser />
        </Route>
      </Switch>
    </div>
  );
};
