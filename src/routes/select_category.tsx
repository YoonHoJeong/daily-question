import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ObjectFlags } from "typescript";
import { gaLog } from "../services/firebase";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
  getTodayQuestions,
} from "../services/question";
import styles from "../styles.module.css";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<{}>();
  const [wantOnlyToday, setWantOnlyToday] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(true);
  const history = useHistory();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.currentTarget as HTMLInputElement;

    history.push({
      pathname: "/today-question",
      state: { qid: element.name },
    });
  };
  useEffect(() => {
    gaLog("select_category_visited");
  }, []);

  useEffect(() => {
    async function fetchQuestionsData() {
      const questionsData = await getQuestionsUntilToday();
      setQuestions(questionsData);
      setLoading(false);
    }
    fetchQuestionsData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.ct}>
      <header className={styles.categoryHeader}>
        <Button
          className={styles.changeCategoryBtn}
          onClick={(e) => {
            setLoading(true);
            if (wantOnlyToday) {
              setWantOnlyToday(false);
            } else {
              setWantOnlyToday(true);
            }
            setLoading(false);
          }}
        >
          {wantOnlyToday ? "이전 질문 구경하기" : "돌아가기"}
        </Button>

        <Button
          variant="contained"
          color="success"
          className={styles.myAnswerBtn}
          onClick={() => {
            history.push("/my-answers");
          }}
        >
          내 답변 보기
        </Button>
      </header>
      {wantOnlyToday ? <div>질문 키워드를 선택해 주세요 😊</div> : null}
      <ul className={styles.datesContainer}>
        {Object.keys(questions!!)
          .filter((date) => {
            return wantOnlyToday === true
              ? formatDateUntilDay(new Date()) === date
              : new Date(formatDateUntilDay(new Date())) > new Date(date);
          })
          .map((date) => {
            const dateQuestions = questions!![date];

            return (
              <li key={date}>
                {wantOnlyToday === true ? null : <div>{date}</div>}
                <ul className={styles.categoryContainer}>
                  {dateQuestions!!.map((q: any) => (
                    <li key={q.qid}>
                      <IconButton name={q.qid} onClick={handleClick}>
                        <Typography fontSize="large">{q.keyword}</Typography>
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
