import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { MyAnswerButton } from "../components/my_answer_btn";
import { gaLog } from "../services/firebase";
import commonStyles from "../styles.module.css";
import ownStyles from "./select_category.module.css";

let styles = Object.assign(commonStyles, ownStyles);

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const history = useHistory();

  const goToTodayQuestions = () => {
    history.push("/keywords", {
      from: "/select-category",
    });
  };

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
    goToTodayQuestions();
  };

  return (
    <div className={styles.btns}>
      <Button
        id="todayquestion"
        variant="contained"
        onClick={handleClickTodayQuestion}
        fullWidth
      >
        오늘의 질문 확인하기 😋
      </Button>
      <MyAnswerButton goBack={goBackFromMyAnswer} />
    </div>
  );
};
