import { Typography } from "@mui/material";
import React from "react";
import styles from "../styles.module.css";

interface Props {
  answer: {
    aid: string;
    question: string;
    answer: string;
  };
}

export const AnswerItem: React.FC<Props> = ({ answer }) => {
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
};
