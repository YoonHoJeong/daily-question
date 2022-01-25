import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useFireDBFetch } from "../../hooks/useFireDBFetch";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import WeeklyAnswers from "./WeeklyAnswers";
import MonthlyAnswers from "./MonthlyAnswers";
import DailyAnswers from "./DailyAnswers";
import { getUserAnswers } from "../../services/fireDB";
import DateFormatPicker from "./DateFormatPicker";
import { Answer, Question } from "../../model/interfaces";

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

export interface UserAnswers {
  [week: string]: {
    [date: string]: {
      [aid: string]: {
        aid: string;
        answer: string;
        created_at: string;
        question: Question;
      };
    };
  };
}

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  const location = useLocation();
  const dateObj = new Date();
  const [date, setDate] = useState({
    dateObj,
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
  });
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<UserAnswers>();
  const [viewFormat, setViewFormat] = useState<ViewFormat>("weekly");

  const changeWeek = (weekCnt: number) => {
    const tmpDate = new Date(date.dateObj);
    tmpDate.setDate(tmpDate.getDate() + 7 * weekCnt); // week ago date

    setDate({
      dateObj: tmpDate,
      year: tmpDate.getFullYear(),
      month: tmpDate.getMonth() + 1,
    });
  };
  const changeMonth = (monthCnt: number) => {
    const tmpDate = new Date(date.dateObj);
    tmpDate.setMonth(tmpDate.getMonth() + 1 * monthCnt);

    setDate({
      dateObj: tmpDate,
      year: tmpDate.getFullYear(),
      month: tmpDate.getMonth() + 1,
    });
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetched = await getUserAnswers(uid, date.year, date.month);
      setAnswers(fetched);
      setLoading(false);
    }
    fetchData();
  }, [date.year, date.month, uid]);

  const AnswersByVF = () => {
    switch (viewFormat) {
      case "weekly":
        return (
          <WeeklyAnswers
            loading={loading}
            changeWeek={changeWeek}
            date={date}
            answers={answers}
          />
        );
      case "monthly":
        return (
          <MonthlyAnswers
            date={date}
            answers={answers || {}}
            changeMonth={changeMonth}
          />
        );
      case "daily":
        return <DailyAnswers answers={answers} />;
    }
  };

  return (
    <Container>
      <DateFormatPicker viewFormat={viewFormat} setViewFormat={setViewFormat} />
      {AnswersByVF()}
    </Container>
  );
};

export default Answers;
