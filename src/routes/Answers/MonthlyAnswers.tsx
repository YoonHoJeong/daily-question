import React from "react";
import {
  AnswerDateCount,
  HelperText,
  Week,
  WeekToggle,
  YearText,
} from "./WeeklyAnswers";
import styles from "../../css/calendar.module.css";
import { UserAnswers } from "./Answers";

interface Props {
  answers: UserAnswers | undefined;
}

const MonthlyAnswers: React.FC<Props> = ({ answers }) => {
  return (
    <>
      <WeekToggle>
        <Week>
          <YearText>2022년</YearText>
          1월
        </Week>
        <Week>
          <YearText>2022년</YearText>
          2월
        </Week>
        <Week>
          <YearText>2022년</YearText>
          3월
        </Week>
      </WeekToggle>

      <HelperText>
        이번 달 <AnswerDateCount>26개</AnswerDateCount>의 질문에 대답했어요.
      </HelperText>

      <ul className={styles.calendar}>
        <li className={styles.day}>월</li>
        <li className={styles.day}>화</li>
        <li className={styles.day}>수</li>
        <li className={styles.day}>목</li>
        <li className={styles.day}>금</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
};

export default MonthlyAnswers;
