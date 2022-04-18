import React from "react";
import { Route, Routes } from "react-router-dom";

import DailyAnswers from "./Answers/DailyAnswers";
import MonthlyAnswers from "./Answers/MonthlyAnswers";
import WeeklyAnswers from "./Answers/Weekly/WeeklyAnswers";
import { DateFormatProvider, useDateFormat } from "../hooks/useDateFormat";
import { Link } from "react-router-dom";
import { ClientLayout } from "../components/layouts/ClientLayout";

interface Props {}

const AnswersPage: React.FC<Props> = () => {
  const dateFormat = useDateFormat();
  console.log(dateFormat);

  return (
    <ClientLayout>
      <DateFormatProvider>
        <Link to="daily">일간</Link>
        <Link to="weekly">주간</Link>
        <Link to="monthly">월간</Link>
        <Routes>
          <Route path="" element={<WeeklyAnswers />} />
          <Route path="weekly" element={<WeeklyAnswers />} />
          <Route path="daily" element={<DailyAnswers />} />
          <Route path="monthly" element={<MonthlyAnswers />} />
        </Routes>
      </DateFormatProvider>
    </ClientLayout>
  );
};

export default AnswersPage;
