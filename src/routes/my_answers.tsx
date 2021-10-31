import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../app";
import styles from "../styles.module.css";

interface Props {}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);
  const answers = auth!!.user!!.answers;
  const history = useHistory();

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
      {answers !== null
        ? Object.keys(answers).map((key) => {
            const answer = answers[key];

            return (
              <li className={styles.questionItem}>
                <section>
                  <Typography variant="h6">질문</Typography>
                  <div className={styles.questionContent}>
                    {answer.question}
                  </div>
                </section>
                <section>
                  <Typography variant="h6">대답</Typography>
                  <div className={styles.questionContent}>{answer.answer}</div>
                </section>
              </li>
            );
          })
        : null}
    </ul>
  );
};
