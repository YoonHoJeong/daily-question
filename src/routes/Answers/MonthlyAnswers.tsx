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
import { UserAnswers } from "./Answers";
import { getAllMonthlyDate } from "../../services/DateManager";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: UserAnswers;
  changeMonth: (monthCnt: number) => void;
}

const MonthlyAnswers: React.FC<Props> = ({ date, answers, changeMonth }) => {
  let answerCnt = 0;

  Object.keys(answers).forEach((week) => {
    Object.keys(answers[week]).forEach((date) => {
      answerCnt += Object.keys(answers[week][date]).length;
    });
  });
  const dates = getAllMonthlyDate(date.dateObj);
  console.log(dates);

  return (
    <>
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
          <li key={date}>{date}</li>
        ))}
      </ul>
    </>
  );
};

export default MonthlyAnswers;
