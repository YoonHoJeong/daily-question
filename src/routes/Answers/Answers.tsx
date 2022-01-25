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
  const [date, setDate] = useState(new Date());
  const [answers, setAnswers] = useState<UserAnswers>();
  console.log(date);

  const [viewFormat, setViewFormat] = useState<ViewFormat>("weekly");

  useEffect(() => {
    async function fetchData() {
      const fetched = await getUserAnswers(
        uid,
        date.getFullYear(),
        date.getMonth() + 1
      );
      setAnswers(fetched);
    }
    fetchData();
  }, [date, uid]);

  const AnswersByVF = () => {
    switch (viewFormat) {
      case "weekly":
        return <WeeklyAnswers date={date} answers={answers} />;
      case "monthly":
        return <MonthlyAnswers answers={answers} />;
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
