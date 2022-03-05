import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import MonthlyAnswers from "./MonthlyAnswers";
import DailyAnswers from "./DailyAnswers";
import DateFormatPicker from "./DateFormatPicker";
import { useFetchUserAnswers } from "../../hooks/customUseQueries";
import { Route } from "react-router-dom";
import WeeklyAnswers from "./WeeklyAnswers";

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  const presentDateObj = new Date();
  const [selectedDate, setSelectedDate] = useState({
    dateObj: presentDateObj,
    year: presentDateObj.getFullYear(),
    month: presentDateObj.getMonth() + 1,
  });

  const { data, isLoading, isError } = useFetchUserAnswers(uid);
  const answers = data ?? {};

  const changeWeek = (weekCnt: number) => {
    const tmpDate = new Date(selectedDate.dateObj);
    tmpDate.setDate(tmpDate.getDate() + 7 * weekCnt); // week ago date

    if (tmpDate.getTime() < new Date().getTime()) {
      setSelectedDate({
        dateObj: tmpDate,
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
      });
    }
  };

  const changeMonth = (monthCnt: number) => {
    const tmpDate = new Date(selectedDate.dateObj);
    tmpDate.setMonth(tmpDate.getMonth() + 1 * monthCnt);

    if (tmpDate.getTime() < new Date().getTime()) {
      setSelectedDate({
        dateObj: tmpDate,
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
      });
    }
  };

  return (
    <Container>
      <DateFormatPicker />
      <Route path="/answers/monthly">
        <MonthlyAnswers
          isLoading={isLoading}
          date={selectedDate}
          answers={answers}
          changeMonth={changeMonth}
        />
      </Route>
      <Route path="/answers/daily">
        <DailyAnswers answers={answers} />
      </Route>

      <Route path="/answers/weekly">
        <WeeklyAnswers
          isLoading={isLoading}
          date={selectedDate}
          answers={answers}
          changeWeek={changeWeek}
        />
      </Route>
      <Route exact path="/answers">
        <WeeklyAnswers
          isLoading={isLoading}
          changeWeek={changeWeek}
          date={selectedDate}
          answers={answers}
        />
      </Route>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Answers;
