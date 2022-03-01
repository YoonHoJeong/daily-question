import React from "react";
import { AnswerDateCount, HelperText } from "./WeeklyAnswers";
import styles from "../../css/calendar.module.css";
import { getAllMonthlyDate, getToday } from "../../services/DateManager";
import Loader from "../../components/common/Loader";
import styled from "styled-components";
import { WeekDateAnswers } from "../../model/interfaces";
import WeekToggle from "./WeekToggle";

interface Props {
  loading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: WeekDateAnswers;
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
    <Container>
      <WeekToggle
        date={{
          year: date.year,
          month: date.month,
        }}
        changeWeekOrMonth={changeMonth}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <HelperText>
            <AnswerDateCount>{answerCnt}개</AnswerDateCount>의 질문에
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
  padding-top: 24px;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MonthlyAnswers;
