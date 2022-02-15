import React from "react";
import {
  AnswerDateCount,
  HelperText,
  Week,
  WeekToggle,
  WeekToggleButton,
  YearText,
} from "./WeeklyAnswers";
import styles from "../../css/calendar.module.css";
import { getAllMonthlyDate, getToday } from "../../services/DateManager";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Loader from "../../components/common/Loader";
import styled from "styled-components";
import { UserAnswers } from "../../model/interfaces";

interface Props {
  loading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: UserAnswers;
  changeMonth: (monthCnt: number) => void;
}

const cellStyleByLen = (monthAnswers: any, date: string) => {
  const len = Object.keys(monthAnswers[date] || {}).length;
  if (new Date(date) > new Date(getToday())) {
    return styles.cellNonActive;
  }

  if (len === 0) {
    return styles.cell0;
  } else if (len === 1) {
    return styles.cell1;
  } else if (len === 2) {
    return styles.cell2;
  } else if (len >= 3) {
    return styles.cell3;
  }
};

const MonthlyAnswers: React.FC<Props> = ({
  loading,
  date,
  answers,
  changeMonth,
}) => {
  let answerCnt = 0;
  let monthAnswers = {};
  Object.keys(answers).forEach((week) => {
    Object.keys(answers[week]).forEach((date) => {
      monthAnswers = { ...monthAnswers, ...answers[week] };
      answerCnt += Object.keys(answers[week][date]).length;
    });
  });
  const dates = getAllMonthlyDate(date.dateObj);

  return (
    <Container style={{ height: "calc(100vh - 84px)" }}>
      <WeekToggle>
        <WeekToggleButton onClick={() => changeMonth(-1)}>
          <KeyboardArrowLeftIcon />
        </WeekToggleButton>

        <Week>
          <YearText>{date.year}년</YearText>
          {date.month}월
        </Week>
        <WeekToggleButton right onClick={() => changeMonth(1)}>
          <KeyboardArrowRightIcon />
        </WeekToggleButton>
      </WeekToggle>

      {loading ? (
        <Loader />
      ) : (
        <>
          <HelperText>
            이번 달 <AnswerDateCount>{answerCnt}개</AnswerDateCount>의 질문에
            대답했어요.
          </HelperText>

          <ul className={styles.calendar}>
            <li className={styles.day}>월</li>
            <li className={styles.day}>화</li>
            <li className={styles.day}>수</li>
            <li className={styles.day}>목</li>
            <li className={styles.day}>금</li>
            {dates.map((date) => (
              <li key={date} className={cellStyleByLen(monthAnswers, date)}>
                {parseInt(date.split("-")[2])}
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MonthlyAnswers;
