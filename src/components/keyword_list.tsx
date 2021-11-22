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
  if (questions === null) {
    return <div>💬 질문을 준비 중입니다.</div>;
  }

  return (
    <>
      <div>키워드를 선택해 주세요 😃</div>

      <ul className={styles.categoryContainer} id="keyword">
        {Object.keys(questions).map((qid: string) => (
          <li key={qid}>
            <IconButton
              id="keyword"
              name={questions[qid].qid}
              onClick={handleClickKeyword}
            >
              <Typography fontSize="large">{questions[qid].keyword}</Typography>
            </IconButton>
          </li>
        ))}
      </ul>
    </>
  );
};
