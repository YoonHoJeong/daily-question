import React from "react";
import { Route, Routes } from "react-router-dom";

import DailyAnswersPage from "./DailyAnswersPage";
import MonthlyAnswersPage from "./MonthlyAnswersPage";
import WeeklyAnswersPage from "./WeeklyAnswersPage";
import { DateFormatProvider } from "../../hooks/useDateFormat";
import { Link } from "react-router-dom";

import { ClientLayout } from "../../components/layouts/ClientLayout";
import { BottomNavigation, Header } from "../../components/layouts";

interface Props {}

const AnswersPage: React.FC<Props> = () => {
  return (
    <ClientLayout>
      <Header />
      <DateFormatProvider>
        <Link to="daily">일간</Link>
        <Link to="weekly">주간</Link>
        <Link to="monthly">월간</Link>
        <Routes>
          <Route path="" element={<WeeklyAnswersPage />} />
          <Route path="weekly" element={<WeeklyAnswersPage />} />
          <Route path="daily" element={<DailyAnswersPage />} />
          <Route path="monthly" element={<MonthlyAnswersPage />} />
        </Routes>
      </DateFormatProvider>
      <BottomNavigation />
    </ClientLayout>
  );
};

export default AnswersPage;
