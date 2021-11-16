import React from "react";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";
import { Route, Switch, useLocation } from "react-router-dom";
import { AdminHeader } from "../components/admin_header";
import { AdminMain } from "./admin_main";
import { useAuth } from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import ProtectedRoute from "../components/protected_route";
import { AdminLogin } from "./admin_login";
import { AdminEnrollUser } from "./admin_enroll_user";
import { EnrollQuestion } from "./admin_enroll_question";

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
  const { pathname } = useLocation();
  const auth = useAuth();

  if (auth?.isAuthenticating) {
    return <CircularProgress />;
  }

  return (
    <>
      <Route path={pathname}>
        <AdminLogin />
      </Route>
      <AdminHeader />
      <ProtectedRoute exact path={`${pathname}/main`}>
        <AdminMain />
      </ProtectedRoute>
      <ProtectedRoute exact path={`${pathname}/enroll-user`}>
        <AdminEnrollUser />
      </ProtectedRoute>
      <ProtectedRoute exact path={`${pathname}/enroll-question`}>
        <EnrollQuestion />
      </ProtectedRoute>
    </>
  );
};
