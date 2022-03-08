import React, { useMemo, useState } from "react";
import { Route } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "../../hooks/useAuth";

import DailyAnswers from "./DailyAnswers";
import MonthlyAnswers from "./MonthlyAnswers";
import WeeklyAnswers from "./Weekly/WeeklyAnswers";
import DateFormatPicker from "./DateFormatPicker";
import { useFetchUserAnswers } from "../../hooks/customUseQueries";
import { formatToDateQidAnswers } from "../../services/AnswerApi";

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
  const dateQidAnswers = useMemo(
    () => formatToDateQidAnswers(data ?? {}),
    [data]
  );

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

  if (isError) {
    <>Error Page</>;
  }

  return (
    <Container>
      <DateFormatPicker />
      <Route path="/answers/monthly">
        <MonthlyAnswers
          isLoading={isLoading}
          date={selectedDate}
          dateQidAnswers={dateQidAnswers}
          changeMonth={changeMonth}
        />
      </Route>
      <Route path="/answers/daily">
        <DailyAnswers dateQidAnswers={dateQidAnswers} />
      </Route>

      <Route path="/answers/weekly">
        <WeeklyAnswers
          isLoading={isLoading}
          date={selectedDate}
          dateQidAnswers={dateQidAnswers}
          changeWeek={changeWeek}
        />
      </Route>
      <Route exact path="/answers">
        <WeeklyAnswers
          isLoading={isLoading}
          changeWeek={changeWeek}
          date={selectedDate}
          dateQidAnswers={dateQidAnswers}
        />
      </Route>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Answers;
