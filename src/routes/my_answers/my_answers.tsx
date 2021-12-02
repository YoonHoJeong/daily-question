import { CircularProgress, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { sendPageView, UserContext } from "../../app";
import {
  formatDateUntilDay,
  UserAnswers,
  userAnswers,
} from "../../services/question";
import styles from "./my_answers.module.css";
import dateService from "../../services/dateService";
import { AnswerCard } from "../../components/answer_card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Collapse from "@mui/material/Collapse";
import { Header } from "../../components/header";

interface Props {}

function formatWeek(weekString: string) {
  const [year, month, week] = weekString.replace("W", "-").split("-");

  return `${year}년 ${month}월 ${week}주차`;
}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);

  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedWeek, setSelectedWeek] = useState<string>(
    dateService.todayWeek()
  );
  const [answers, setAnswers] = useState<UserAnswers>({});
  // const [dateList, setDateList] = useState<{}>([]);

  useEffect(() => {
    sendPageView();
    async function fetchData() {
      setLoading(true);
      const answersData = await userAnswers(auth!!.user!!.uid);
      setAnswers(answersData);

      setLoading(false);
      // let tmpDateList: {} = {};

      // const tmpDatesAnmswerCnt = {};
      // answerData.forEach((answer) => {
      //   const d = formatDateUntilDay(new Date(answer.created_at));
      //   if (tmpDatesAnmswerCnt[d]) {
      //     tmpDatesAnmswerCnt[d] = tmpDatesAnmswerCnt[d] + 1;
      //   } else {
      //     tmpDatesAnmswerCnt[d] = 1;
      //   }
      // });

      // setDatesAnswerCnt(tmpDatesAnmswerCnt);
      // setDateList(tmpDateList);
      // setLoading(false);
    }
    fetchData();
  }, []);

  const handleClickGrass: React.MouseEventHandler<HTMLLIElement> | undefined = (
    e
  ) => {
    const date = e.currentTarget.getAttribute("data-date");

    if (date && answers[selectedWeek][date]) {
      setSelectedDate(date);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const weeklyAnswers = answers[selectedWeek];
  let selectedAnswers: any[] = [];
  if (selectedDate) {
    selectedAnswers = Object.keys(weeklyAnswers[selectedDate]).map(
      (aid) => weeklyAnswers[selectedDate][aid]
    );
  } else {
    Object.keys(weeklyAnswers).forEach((date) => {
      const tmp = Object.keys(weeklyAnswers[date]).map(
        (aid) => weeklyAnswers[date][aid]
      );
      selectedAnswers = selectedAnswers.concat(tmp);
    });
  }

  const weeklyDates = dateService.weekDates(selectedWeek);

  return (
    <>
      <Header />
      <div className={`${styles.myAnswersContainer}`}>
        <div className={styles.weekText}>{formatWeek(selectedWeek)}</div>
        <div className={styles.msg}>
          5일 중{" "}
          <span className={styles.coloredDate}>
            {Object.keys(weeklyAnswers).length}일
          </span>{" "}
          대답했어요.
        </div>
        <ul className={styles.grassGrid}>
          {weeklyDates.map((date: string) => (
            <li
              key={date}
              data-date={date}
              onClick={handleClickGrass}
              className={`${styles.grassItem} ${
                Object.keys(weeklyAnswers).includes(date)
                  ? styles.colored
                  : null
              }`}
            >
              {date.split("-")[2]}
            </li>
          ))}
        </ul>

        <ul className={styles.answerList}>
          {selectedAnswers.map((answer) => (
            <AnswerCard key={answer.aid} answer={answer} />
          ))}
        </ul>
      </div>
    </>
  );
};
