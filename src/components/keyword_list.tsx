import { IconButton, Typography } from "@mui/material";
import React from "react";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";

interface Props {
  questions: {};
  handleClickKeyword: React.MouseEventHandler<HTMLButtonElement>;
}

export const KeywordList: React.FC<Props> = ({
  questions,
  handleClickKeyword,
}) => {
  return (
    <>
      <div>키워드를 선택해 주세요 😋</div>
      <ul className={styles.datesContainer}>
        {Object.keys(questions!!)
          .filter((date) => {
            return formatDateUntilDay(new Date()) === date;
          })
          .map((date) => {
            const dateQuestions = questions!![date];
            return (
              <li key={date}>
                <ul className={styles.categoryContainer} id="keyword">
                  {dateQuestions!!.map((q: any) => (
                    <li key={q.qid}>
                      <IconButton
                        id="keyword"
                        name={q.qid}
                        onClick={handleClickKeyword}
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
    </>
  );
};
