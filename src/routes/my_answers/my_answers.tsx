import { CircularProgress, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../app";
import { gaLog } from "../../services/firebase";
import { formatDateUntilDay, getUserAnswers } from "../../services/question";
import styles from "./my_answers.module.css";
import dateService from "../../services/dateService";
import { AnswerCard } from "../../components/answer_card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Collapse from "@mui/material/Collapse";
import { Header } from "../../components/header";

interface Props {}

interface LocationState {
  qid?: string;
  from: string;
  rateSubmitted?: Boolean;
}

const GrassItems: React.FC<{
  dateList: {};
  selectedWeek: string;
  datesAnswerCnt: {};
  answers: any[];
  handleClickGrass: React.MouseEventHandler<HTMLLIElement> | undefined;
}> = ({
  dateList,
  datesAnswerCnt,
  answers,
  selectedWeek,
  handleClickGrass,
}) => {
  const filtered = Object.keys(dateList)
    .filter((week) => week === selectedWeek)
    .map((week) => dateList[week])
    .pop();

  return (
    <ul className={styles.grassGrid}>
      {filtered &&
        filtered.map((date: string) => (
          <li
            key={date}
            data-date={date}
            onClick={handleClickGrass}
            className={`${styles.grassItem} ${
              datesAnswerCnt[date] > 0 ? styles.colored : null
            }`}
          ></li>
        ))}
    </ul>
  );
};

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);

  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedWeek, setSelectedWeek] = useState<string>(
    dateService.getWeekByDate(new Date())
  );
  const [answers, setAnswers] = useState<any[]>([]);
  const [datesAnswerCnt, setDatesAnswerCnt] = useState({});
  const [answersOn, setAnswersOn] = useState<boolean>(false);
  const [dateList, setDateList] = useState<{}>([]);
  const history = useHistory();
  const location = useLocation();
  const { qid, from, rateSubmitted } = location.state as LocationState;

  useEffect(() => {
    gaLog("my_answers_visited");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const answerData = await getUserAnswers(auth!!.user);
      setAnswers(answerData);
      let tmpDateList: {} = {};
      answerData.forEach((answer) => {
        const dateString = formatDateUntilDay(new Date(answer.created_at));
        if (!Object.keys(tmpDateList).includes(dateString)) {
          const weekDates = dateService.getWeekDateListByDate(
            new Date(dateString)
          );
          const firstDate = new Date(weekDates[0]);
          const tmpMonth = firstDate.getMonth() + 1;
          const tmpDate = firstDate.getDate();
          const week = ((tmpDate / 7) | 0) + 1;

          tmpDateList[`${tmpMonth}월 ${week}주차`] = weekDates;
        }
      });

      const tmpDatesAnmswerCnt = {};
      answerData.forEach((answer) => {
        const d = formatDateUntilDay(new Date(answer.created_at));
        if (tmpDatesAnmswerCnt[d]) {
          tmpDatesAnmswerCnt[d] = tmpDatesAnmswerCnt[d] + 1;
        } else {
          tmpDatesAnmswerCnt[d] = 1;
        }
      });

      setDatesAnswerCnt(tmpDatesAnmswerCnt);
      setDateList(tmpDateList);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleClickGoBack = () => {
    history.replace({
      pathname: from,
      state: {
        qid,
        rateSubmitted,
      },
    });
  };
  const handleClickGrass: React.MouseEventHandler<HTMLLIElement> | undefined = (
    e
  ) => {
    const date = e.currentTarget.getAttribute("data-date");
    if (selectedDate === date) {
      date && setSelectedDate("");
      setAnswersOn(false);
    } else {
      date && setSelectedDate(date);
      setAnswersOn(true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const handleChangeMonth = (e: any) => {
    const direction = e.currentTarget.name;
    const idx = Object.keys(dateList).indexOf(selectedWeek!);

    if (direction === "back") {
      if (idx > 0) {
        const next = Object.keys(dateList)[idx - 1];
        setSelectedWeek(next);
      }
    } else {
      if (idx < Object.keys(dateList).length - 1) {
        const next = Object.keys(dateList)[idx + 1];
        setSelectedWeek(next);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={`${styles.myAnswersContainer}`}>
        <div className={styles.weekText}>
          <IconButton name="back" onClick={handleChangeMonth}>
            {"   "}
            <ArrowBackIosIcon />
          </IconButton>
          {selectedWeek}
          <IconButton name="next" onClick={handleChangeMonth}>
            {"   "}
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className={styles.msg}>
          5일 중{" "}
          <span className={styles.coloredDate}>
            {
              Object.keys(datesAnswerCnt).filter(
                (date) =>
                  dateService.getWeekByDate(new Date(date)) === selectedWeek
              ).length
            }
            일
          </span>{" "}
          대답했어요.
        </div>

        <GrassItems
          dateList={dateList}
          answers={answers}
          handleClickGrass={handleClickGrass}
          selectedWeek={selectedWeek}
          datesAnswerCnt={datesAnswerCnt}
        />
        <Collapse
          className={styles.answerList}
          in={answersOn}
          timeout={600}
          sx={{ width: "100%" }}
        >
          <ul className={styles.answerList}>
            {answers
              .filter(
                ({ created_at }) =>
                  formatDateUntilDay(new Date(created_at)) === selectedDate
              )
              .map((answer) => (
                <AnswerCard key={answer.aid} answer={answer} />
              ))}
          </ul>
        </Collapse>
      </div>
    </>
  );
};
