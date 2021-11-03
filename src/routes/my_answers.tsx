import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../app";
import { gaLog } from "../services/firebase";
import { getUserAnswers } from "../services/question";
import styles from "../styles.module.css";

interface Props {}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);

  const [loading, setLoading] = useState<Boolean>(true);
  const [answers, setAnswers] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    gaLog("my_answers_visited");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserAnswers(auth!!.user);
      console.log(data);

      setAnswers(data);

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ul className={styles.ct}>
      <Button
        className={styles.backBtn}
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </Button>
      {answers !== undefined ? (
        answers.map((answer) => {
          return (
            <li key={answer.aid} className={styles.questionItem}>
              <section>
                <Typography>질문</Typography>
                <div className={styles.questionContent}>{answer.question}</div>
              </section>
              <section>
                <Typography>대답</Typography>
                <div className={styles.questionContent}>{answer.answer}</div>
              </section>
            </li>
          );
        })
      ) : (
        <Typography variant="h6">등록된 답변이 없습니다!</Typography>
      )}
    </ul>
  );
};
