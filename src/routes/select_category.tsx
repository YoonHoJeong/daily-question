import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gaLog } from "../services/firebase";
import { getTodayQuestion } from "../services/question";
import styles from "../styles.module.css";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<any[]>();
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
      const todayQuestions = await getTodayQuestion();

      setQuestions(todayQuestions);
      setLoading(false);
    }
    fetchQuestionsData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.ct}>
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
      <>답해보고 싶은 키워드를 골라주세요 🤔</>
      <ul className={styles.categoryContainer}>
        {questions!!.map((q) => (
          <li key={q.qid}>
            <IconButton name={q.qid} onClick={handleClick}>
              <Typography fontSize="large">{q.keyword}</Typography>
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
