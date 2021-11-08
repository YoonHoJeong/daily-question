import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gaLog } from "../services/firebase";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
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
      state: { qid: element.name, wantOnlyToday },
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
      <header className={styles.header}>
        {/* <Button
          className={styles.changeCategoryBtn}
          onClick={() => {
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
        </Button> */}

        <Button
          id="myanswer"
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

      {wantOnlyToday ? (
        <>
          <div>키워드를 선택해 주세요 😋</div>
          {/* <Button
            color="warning"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "https://forms.gle/AqJ642yNG7pCwgYt7";
            }}
          >
            11월 2주차 등록하기
          </Button> */}
        </>
      ) : null}
      <ul className={styles.datesContainer}>
        {Object.keys(questions!!)
          .filter((date) => {
            return wantOnlyToday
              ? formatDateUntilDay(new Date()) === date
              : new Date(formatDateUntilDay(new Date())) > new Date(date);
          })
          .map((date) => {
            const dateQuestions = questions!![date];

            return (
              <li key={date}>
                {wantOnlyToday === true ? null : <div>{date}</div>}
                <ul className={styles.categoryContainer} id="keyword">
                  {dateQuestions!!.map((q: any) => (
                    <li key={q.qid}>
                      <IconButton
                        id="keyword"
                        name={q.qid}
                        onClick={handleClick}
                      >
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
