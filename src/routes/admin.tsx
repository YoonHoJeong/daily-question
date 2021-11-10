import React from "react";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";
import { Route, Switch } from "react-router-dom";
import { AdminHeader } from "../components/admin_header";

interface Props {}

export function getServiceDateList() {
  const LAUNCH_DATE = "2021-11-01";
  const dates = [];
  const tmpDate = new Date(LAUNCH_DATE);
  const todayDate = new Date();

  // 시간, 분, 초 기본값이 09:00:00
  todayDate.setHours(9);
  todayDate.setMinutes(1);

  while (tmpDate <= todayDate) {
    if (tmpDate.getDay() !== 6 && tmpDate.getDay() !== 7)
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
      <Switch>
        <AdminHeader />
        <Route exact path="/admin/main">
          Home
        </Route>
        <Route exact path={`/admin/enroll`}>
          User Enrollment
        </Route>
      </Switch>
    </main>
  );
};
