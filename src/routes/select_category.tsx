import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { KeywordList } from "../components/keyword_list";
import { MyAnswerButton } from "../components/my_answer_btn";
import { gaLog } from "../services/firebase";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
} from "../services/question";
import commonStyles from "../styles.module.css";
import ownStyles from "./select_category.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

let styles = Object.assign(commonStyles, ownStyles);

interface Props {}

interface LocationState {
  isKeywordsOn: boolean;
}

export const SelectCategory: React.FC<Props> = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [questions, setQuestions] = useState<{}>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const [isKeywordsOn, setIsKeywordsOn] = useState<Boolean>(
    locationState ? locationState.isKeywordsOn : false
  );
  const history = useHistory();
  const handleClickKeyword: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const element = e.currentTarget as HTMLInputElement;

    history.push({
      pathname: "/today-question",
      state: { qid: element.name },
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

  useEffect(() => {
    async function fetchQuestionsData() {
      const questionsData = await getQuestionsUntilToday();
      setQuestions(questionsData);
      setLoading(false);
    }
    fetchQuestionsData();
  }, []);

  const handleClickTodayQuestion:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    setIsKeywordsOn(true);
  };

  const handleClickOffKeywords:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    setIsKeywordsOn(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.ct}>
      {isKeywordsOn ? (
        <>
          <header className={styles.header}>
            <IconButton onClick={handleClickOffKeywords}>
              <ArrowBackIcon />
            </IconButton>
          </header>
          <KeywordList
            questions={questions}
            handleClickKeyword={handleClickKeyword}
          />
        </>
      ) : (
        <div className={styles.btns}>
          <Button
            id="todayquestion"
            variant="contained"
            onClick={handleClickTodayQuestion}
          >
            오늘의 질문이 도착했어요 😋
          </Button>
          <MyAnswerButton goBack={goBackFromMyAnswer} />
        </div>
      )}
    </div>
  );
};
