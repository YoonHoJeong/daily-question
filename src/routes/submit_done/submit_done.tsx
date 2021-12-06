import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { sendPageView } from "../../app";
import styles from "./submit_done.module.css";

interface Props {}

export const SubmitDone: React.FC<Props> = () => {
  const history = useHistory();
  const handleClickOtherQuestions:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    history.push({
      pathname: "/keywords",
      state: {
        from: "/submit-done",
      },
    });
  };
  useEffect(() => {
    sendPageView();
  }, []);

  return (
    <div className={styles.ratingDone}>
      <Typography variant="h6" align="center">
        내일도 기대해주세요 😊
      </Typography>

      <Button
        id="anotherkeyword"
        className={styles.otherQuestionsBtn}
        fullWidth
        variant="contained"
        onClick={handleClickOtherQuestions}
      >
        다른 질문 확인하기
      </Button>
      <Button
        id="myanswer"
        variant="contained"
        color="success"
        className={styles.myAnswerBtn}
        fullWidth
        onClick={() => {
          history.push({
            pathname: "/my-answers",
            state: {
              from: "/submit-done",
            },
          });
        }}
      >
        내 답변 목록
      </Button>
    </div>
  );
};
