import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import WeeklyAnswers from "./WeeklyAnswers";
import MonthlyAnswers from "./MonthlyAnswers";
import DailyAnswers from "./DailyAnswers";
import DateFormatPicker from "./DateFormatPicker";
import {
  useFetchUserAnswers,
  useFetchUserWeekDateAnswers,
} from "../../hooks/customUseQueries";
import { Route } from "react-router-dom";

type ViewFormat = "weekly" | "daily" | "monthly";

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  const dateObj = new Date();
  const [date, setDate] = useState({
    dateObj,
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
  });

  const { data, isLoading } = useFetchUserWeekDateAnswers(uid);
  const answers = data ?? {};

  const { data: rawAnswersData, isLoading: isRawAnswersLoading } =
    useFetchUserAnswers(uid);
  const rawAnswers = rawAnswersData ?? {};

  const changeWeek = (weekCnt: number) => {
    const tmpDate = new Date(date.dateObj);
    tmpDate.setDate(tmpDate.getDate() + 7 * weekCnt); // week ago date

    if (tmpDate.getTime() < new Date().getTime()) {
      setDate({
        dateObj: tmpDate,
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
      });
    }
  };

  const changeMonth = (monthCnt: number) => {
    const tmpDate = new Date(date.dateObj);
    tmpDate.setMonth(tmpDate.getMonth() + 1 * monthCnt);

    if (tmpDate.getTime() < new Date().getTime()) {
      setDate({
        dateObj: tmpDate,
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
      });
    }
  };

  return (
    <Container style={{ height: "calc(100vh - 84px)" }}>
      <DateFormatPicker />
      <Route path="/answers/monthly">
        <MonthlyAnswers
          loading={isRawAnswersLoading}
          date={date}
          answers={rawAnswers}
          changeMonth={changeMonth}
        />
      </Route>
      <Route path="/answers/daily">
        <DailyAnswers answers={answers} />;
      </Route>

      <Route path="/answers/weekly">
        <WeeklyAnswers
          loading={isLoading}
          changeWeek={changeWeek}
          date={date}
          answers={answers}
        />
      </Route>
      <Route exact path="/answers">
        <WeeklyAnswers
          loading={isLoading}
          changeWeek={changeWeek}
          date={date}
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

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Answers;
