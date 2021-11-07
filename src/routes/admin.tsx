import React from "react";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";
import { Route } from "react-router-dom";
import { AdminHeader } from "../components/admin_header";

interface Props {}

const LAUNCH_DATE = "2021-11-01";

export function getServiceDateList() {
  const dates = [];
  const tmpDate = new Date(LAUNCH_DATE);
  const todayDate = new Date();

  while (tmpDate <= todayDate) {
    dates.push(formatDateUntilDay(tmpDate));
    tmpDate.setDate(tmpDate.getDate() + 1);
  }
  return dates;
}

export interface Data {
  users: {};
  questions: {};
  answers: {};
  rates: {};
}

export const Admin: React.FC<Props> = () => {
  return (
    <main className={styles.adminMain}>
      <AdminHeader />
      <Route exact path="/admin/main">
        Home
      </Route>
      <Route exact path={`/admin/enroll`}>
        User Enrollment
      </Route>
    </main>
  );
};
