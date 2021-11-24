import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { gaLog } from "../../services/firebase";
import styles from "./select_category.module.css";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const history = useHistory();

  const handleClickMyAnswers = () => {
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
    <div className={styles.btns}>
      <Button
        variant="contained"
        className={styles.todayBtn}
        id="todayquestion"
        onClick={handleClickTodayQuestion}
      >
        오늘의 질문 확인하기😀
      </Button>
      <Button
        variant="outlined"
        className={styles.myAnswerBtn}
        onClick={handleClickMyAnswers}
      >
        내 답변 목록
      </Button>
    </div>
  );
};
