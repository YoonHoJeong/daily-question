import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../app";
import { gaLog } from "../services/firebase";
import styles from "../styles.module.css";

interface Props {}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);
  const answers = auth!!.user!!.answers;

  const history = useHistory();

  useEffect(() => {
    gaLog("my_answers_visited");
  });
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
        Object.keys(answers).map((key) => {
          const answer = answers[key];

          return (
            <li key={key} className={styles.questionItem}>
              <section>
                <Typography variant="h6">질문</Typography>
                <div className={styles.questionContent}>{answer.question}</div>
              </section>
              <section>
                <Typography variant="h6">대답</Typography>
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
