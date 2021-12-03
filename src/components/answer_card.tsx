import React, { useState } from "react";
import { Answer } from "../interfaces";
import styles from "./answer_card.module.css";

interface Props {
  answer: Answer;
}

export const AnswerCard: React.FC<Props> = ({ answer }) => {
  const [isCardFold, setIsCardFold] = useState<Boolean>(true);

  const handleClickExpand: React.MouseEventHandler<HTMLLIElement> | undefined =
    () => {
      setIsCardFold((prev) => !prev);
    };

  return (
    <li className={styles.card} onClick={handleClickExpand}>
      <div>
        <p className={styles.keywordText}>{answer.question.keyword}</p>

        <div className={styles.questionText}>
          Q.{" "}
          {isCardFold
            ? `${answer.question.question.substr(0, 17)}...`
            : answer.question.question}
        </div>
      </div>
      <p className={styles.answerText}>
        {isCardFold
          ? answer.answer.length >= 17
            ? `${answer.answer.substr(0, 17)}...`
            : answer.answer
          : answer.answer}
      </p>
    </li>
  );
};
