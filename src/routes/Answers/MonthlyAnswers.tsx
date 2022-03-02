import React from "react";
import { AnswerDateCount, HelperText } from "./WeeklyAnswers";
import styles from "../../css/calendar.module.css";
import {
  convertDateUntilDay,
  getAllDatesOfMonth,
  getToday,
} from "../../services/DateManager";
import Loader from "../../components/common/Loader";
import styled from "styled-components";
import { Answer, FetchedAnswers } from "../../model/interfaces";
import WeekToggle from "./WeekToggle";

interface Props {
  loading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: FetchedAnswers;
  changeMonth: (monthCnt: number) => void;
}

const MonthlyAnswers: React.FC<Props> = ({
  loading,
  date,
  answers,
  changeMonth,
}) => {
  console.log(answers);

  const monthAnswers = Object.keys(answers)
    .filter((aid) => {
      const answeredDateObj = new Date(answers[aid].created_at);
      const answeredYear = answeredDateObj.getFullYear();
      const answeredMonth = answeredDateObj.getMonth() + 1;

      const selectedYear = date.year;
      const selectedMonth = date.month;
      console.log(answeredYear, answeredMonth, selectedYear, selectedMonth);

      return answeredYear === selectedYear && answeredMonth === selectedMonth;
    })
    .map((aid) => answers[aid]);

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
            <AnswerDateCount>
              {Object.keys(monthAnswers).length}개
            </AnswerDateCount>
            의 질문에 대답했어요.
          </HelperText>

          <Calendar date={date.dateObj} monthAnswers={monthAnswers} />
        </>
      )}
    </Container>
  );
};

const Calendar: React.FC<{ date: Date; monthAnswers: Answer[] }> = ({
  date,
  monthAnswers,
}) => {
  const dates = getAllDatesOfMonth(date);

  return (
    <ul className={styles.calendar}>
      <li className={styles.day}>월</li>
      <li className={styles.day}>화</li>
      <li className={styles.day}>수</li>
      <li className={styles.day}>목</li>
      <li className={styles.day}>금</li>
      {dates.map((date) => (
        <li key={date} className={cellStyleByAnswerCnt(monthAnswers, date)}>
          {new Date(date).getDate()}
        </li>
      ))}
    </ul>
  );
};

const cellStyleByAnswerCnt = (monthAnswers: Answer[], date: string) => {
  if (new Date(date) > new Date(getToday())) {
    return styles.cellNonActive;
  }

  const dateAnswers = monthAnswers.filter(
    (answer) => convertDateUntilDay(new Date(answer.created_at)) === date
  );

  const answerCnt = dateAnswers.length;
  let cellStyle;
  if (answerCnt === 0) {
    cellStyle = styles.cell0;
  } else if (answerCnt === 1) {
    cellStyle = styles.cell1;
  } else if (answerCnt === 2) {
    cellStyle = styles.cell2;
  } else if (answerCnt >= 3) {
    cellStyle = styles.cell3;
  }

  return cellStyle;
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding-top: 24px;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MonthlyAnswers;
