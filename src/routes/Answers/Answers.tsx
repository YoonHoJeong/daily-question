import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import WeeklyAnswers from "./WeeklyAnswers";
import MonthlyAnswers from "./MonthlyAnswers";
import DailyAnswers from "./DailyAnswers";
import DateFormatPicker from "./DateFormatPicker";
import { useFetchUserWeekDateAnswers } from "../../hooks/customUseQueries";

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type ViewFormat = "weekly" | "daily" | "monthly";

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

  const { data, isLoading, isError } = useFetchUserWeekDateAnswers(uid);
  const answers = data ?? {};

  const [viewFormat, setViewFormat] = useState<ViewFormat>("weekly");

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

  const AnswersByViewFormat = () => {
    switch (viewFormat) {
      case "weekly":
        return (
          <WeeklyAnswers
            loading={isLoading}
            changeWeek={changeWeek}
            date={date}
            answers={answers}
          />
        );
      case "monthly":
        return (
          <MonthlyAnswers
            loading={isLoading}
            date={date}
            answers={answers}
            changeMonth={changeMonth}
          />
        );
      case "daily":
        return <DailyAnswers answers={answers} />;
    }
  };

  return (
    <Container style={{ height: "calc(100vh - 84px)" }}>
      <DateFormatPicker viewFormat={viewFormat} setViewFormat={setViewFormat} />
      {AnswersByViewFormat()}
    </Container>
  );
};

export default Answers;
