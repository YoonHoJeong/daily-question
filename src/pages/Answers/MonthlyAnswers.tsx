import React from "react";
import { AnswerDateCount, HelperText } from "./WeeklyAnswers";
import { getAllDatesOfMonth, getToday } from "../../services/DateManager";
import Loader from "../../components/common/Loader";
import styles from "../../assets/css/calendar.module.css";
import styled from "styled-components";
import {
  Answer,
  DateQidAnswers,
  FetchedAnswers,
  Question,
} from "../../model/interfaces";
import WeekToggle from "./WeekToggle";
import { formatAnswersToDateQidAnswers } from "../../services/utils";

interface Props {
  isLoading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: FetchedAnswers;
  changeMonth: (monthCnt: number) => void;
}

const MonthlyAnswers: React.FC<Props> = ({
  isLoading,
  date,
  answers,
  changeMonth,
}) => {
  const dateQidAnswers = formatAnswersToDateQidAnswers(answers);
  const monthAnswers: DateQidAnswers = Object.keys(dateQidAnswers).reduce(
    (obj, tmpDate) => {
      const [tmpYear, tmpMonth] = tmpDate.split("-");
      if (
        parseInt(tmpYear) === date.year &&
        parseInt(tmpMonth) === date.month
      ) {
        obj[tmpDate] = dateQidAnswers[tmpDate];
      }

      return obj;
    },
    {}
  );
  const totalAnswerCnt = Object.keys(monthAnswers).reduce((monthAcc, date) => {
    const dateCnt = Object.keys(monthAnswers[date]).reduce(
      (dateAcc, qid) =>
        dateAcc + Object.keys(monthAnswers[date][qid].answers).length,
      0
    );
    return monthAcc + dateCnt;
  }, 0);

  return (
    <Container>
      <WeekToggle
        date={{
          year: date.year,
          month: date.month,
        }}
        changeWeekOrMonth={changeMonth}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HelperText>
            <AnswerDateCount> {totalAnswerCnt}개</AnswerDateCount>의 질문에
            대답했어요.
          </HelperText>

          <Calendar dateObj={date.dateObj} monthAnswers={monthAnswers} />
        </>
      )}
    </Container>
  );
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

interface CalendarProps {
  dateObj: Date;
  monthAnswers: DateQidAnswers;
}

const Calendar: React.FC<CalendarProps> = ({ dateObj, monthAnswers }) => {
  const dates = getAllDatesOfMonth(dateObj);
  const todayDateObj = new Date(getToday());
  const isActiveDate = (compareDate: string) =>
    new Date(compareDate) < todayDateObj ? true : false;

  return (
    <ul className={styles.calendar}>
      <li className={styles.day}>월</li>
      <li className={styles.day}>화</li>
      <li className={styles.day}>수</li>
      <li className={styles.day}>목</li>
      <li className={styles.day}>금</li>
      {dates.map((date) => (
        <li
          key={date}
          className={
            isActiveDate(date)
              ? cellStyleByAnswerCnt(monthAnswers[date])
              : styles.cellNonActive
          }
        >
          {new Date(date).getDate()}
        </li>
      ))}
    </ul>
  );
};

const cellStyleByAnswerCnt = (dateAnswers?: {
  [qid: string]: {
    question: Question;
    answers: {
      [aid: string]: Answer;
    };
  };
}) => {
  if (!dateAnswers) {
    return styles.cell0;
  }

  const answerCnt = Object.keys(dateAnswers).reduce(
    (acc, qid) => acc + Object.keys(dateAnswers[qid].answers).length,
    0
  );

  let cellStyle;
  if (answerCnt === 1) {
    cellStyle = styles.cell1;
  } else if (answerCnt === 2) {
    cellStyle = styles.cell2;
  } else if (answerCnt >= 3) {
    cellStyle = styles.cell3;
  }

  return cellStyle;
};

export default MonthlyAnswers;
