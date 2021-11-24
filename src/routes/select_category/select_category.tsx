import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { MyAnswerButton } from "../../components/my_answer_btn";
import { gaLog } from "../../services/firebase";
import { getTodayQuestions } from "../../services/question";
import commonStyles from "../../styles.module.css";
import ownStyles from "./select_category.module.css";

let styles = Object.assign(commonStyles, ownStyles);

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const history = useHistory();

  const goBackFromMyAnswer = () => {
    history.push({
      pathname: "/my-answers",
      state: {
        from: "/select-category",
      },
    });
  };
  useEffect(() => {
    gaLog("select_category_visited");
  }, []);

  const handleClickTodayQuestion:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    history.push({
      pathname: "/keywords",
      state: {
        from: "/select-category",
      },
    });
  };

  return (
    <div>
      <div className={styles.btns}>
        <Button
          id="todayquestion"
          variant="contained"
          onClick={handleClickTodayQuestion}
        >
          오늘의 질문 확인하기 😀
        </Button>
        <MyAnswerButton goBack={goBackFromMyAnswer} />
      </div>
    </div>
  );
};
