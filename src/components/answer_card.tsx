import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./answer_card.module.css";

interface Props {
  answer: {
    aid: string;
    answer: string;
    created_at: string;
    question: string;
    qid: string;
    uid: string;
    keyword: string;
  };
}

export const AnswerCard: React.FC<Props> = ({ answer }) => {
  const [isCardFold, setIsCardFold] = useState<Boolean>(true);

  const handleClickExpand: React.MouseEventHandler<HTMLDivElement> | undefined =
    () => {
      setIsCardFold(!isCardFold);
    };

  return (
    <div className={styles.card} onClick={handleClickExpand}>
      <div>
        <p className={styles.keywordText}>{answer.keyword}</p>

        <div className={styles.questionText}>
          Q.{" "}
          {isCardFold ? `${answer.question.substr(0, 17)}...` : answer.question}
        </div>
      </div>
      <p className={styles.answerText}>
        {isCardFold
          ? answer.answer.length >= 17
            ? `${answer.answer.substr(0, 17)}...`
            : answer.answer
          : answer.answer}
      </p>
    </div>
  );
};
