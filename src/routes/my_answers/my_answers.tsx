import { CircularProgress, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { sendPageView, UserContext } from "../../app";
import { UserAnswers, userAnswers } from "../../services/question";
import styles from "./my_answers.module.css";
import dateService from "../../services/dateService";
import { AnswerCard } from "../../components/answer_card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

      // 이번 주 answersData가 없을 때, 이번 주 key 추가
      if (!answersData[selectedWeek]) {
        answersData[selectedWeek] = {};
      }

      setAnswers(answersData);

      setLoading(false);
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

  const weeklyAnswers = answers[selectedWeek] || {};
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
  const weeks = Object.keys(answers).sort((a, b) => (a > b ? 1 : -1));
  const weekIdx = weeks.indexOf(selectedWeek);

  const weeklyDates = dateService.weekDates(selectedWeek);

  return (
    <>
      <Header />
      <div className={`${styles.myAnswersContainer}`}>
        <div className={styles.weekBox}>
          {weekIdx !== 0 ? (
            <IconButton
              style={{
                position: "absolute",
                top: -8,
                left: -40,
              }}
              onClick={() => {
                setSelectedWeek(weeks[weekIdx - 1]);
                setSelectedDate("");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          ) : null}
          <div className={styles.weekText}>{formatWeek(weeks[weekIdx])}</div>

          {weekIdx !== weeks.length - 1 ? (
            <IconButton
              style={{
                position: "absolute",
                top: -8,
                right: -40,
              }}
              onClick={() => {
                setSelectedWeek(weeks[weekIdx + 1]);
                setSelectedDate("");
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          ) : null}
        </div>
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
