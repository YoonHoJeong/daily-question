import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useFireDBFetch } from "../../hooks/useFireDBFetch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateFormatPicker = styled.ul`
  position: absolute;
  top: 12px;
  right: 48px;
`;
const DateFormat = styled.li`
  width: 44px;
  height: 26px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-color: ${(props) => props.theme.palette.white};
  &:not(:first-child) {
    display: none;

    background-color: ${(props) => props.theme.palette.bgGrey2};
    margin-top: 2px;
  }
`;

const DateFormatIcon = styled.button`
  position: absolute;
  top: 0px;
  right: -30px;

  padding: 0;

  border: none;
  background-color: transparent;
`;

type ViewFormat = "weekly" | "daily" | "monthly";

interface DateFormatterProps {
  viewFormat: ViewFormat;
  setViewFormat: React.Dispatch<React.SetStateAction<ViewFormat>>;
}

interface Props {}

const answers = [
  {
    aid: 1,
    keyword: "과자",
    question: "당신이 제일 좋아하는 과자는 무엇인가요?",
    answer:
      "제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는",
  },
  {
    aid: 2,
    keyword: "과자2",
    question: "당신이 제일 좋아하는 과자는 무엇인가요?",
    answer:
      "제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는",
  },
  {
    aid: 3,
    keyword: "과자3",
    question: "당신이 제일 좋아하는 과자는 무엇인가요?",
    answer:
      "제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는",
  },
];

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";

  const {
    data: answers,
    loading,
    error,
  } = useFireDBFetch<any>(`user-answers/${uid}`);
  const [selectedWeek, setSelectedWeek] = useState<string | undefined>();
  const location = useLocation();
  // useEffect(() => {
  //   setSelectedWeek(Object.keys(answers).pop());
  // }, [answers]);

  // if (loading) {
  //   return <>loading...</>;
  // }

  const [folded, setFolded] = useState<boolean>(true);
  const [viewFormat, setViewFormat] = useState<ViewFormat>("weekly");

  const onClick = (e: SyntheticEvent) => {
    setFolded((currentState) => !currentState);
  };
  const onClickViewFormat = (e: SyntheticEvent) => {
    const vf = (e.target as HTMLButtonElement).name as ViewFormat;
    setViewFormat(vf);
    setFolded(true);
  };
  const viewFormats = { weekly: "주간", daily: "일간", monthly: "월간" };

  const AnswersByVF = () => {
    switch (viewFormat) {
      case "weekly":
        return <WeeklyAnswers answers={answers} />;
      case "monthly":
        return <MonthlyAnswers answers={answers} />;
      case "daily":
        return <DailyAnswers answers={answers} />;
    }
  };

  return (
    <Container>
      <DateFormatPicker>
        <DateFormat>{viewFormats[viewFormat]}</DateFormat>
        {Object.keys(viewFormats)
          .filter((key) => key !== viewFormat)
          .map((vf) => (
            <DateFormat key={vf} style={{ display: folded ? "none" : "flex" }}>
              <button name={vf} onClick={onClickViewFormat}>
                {viewFormats[vf]}
              </button>
            </DateFormat>
          ))}

        <DateFormatIcon onClick={onClick}>
          {folded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </DateFormatIcon>
      </DateFormatPicker>

      {AnswersByVF()}
    </Container>
  );
};

export default Answers;
