import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { KeywordList } from "../components/keyword_list";
import { MyAnswerButton } from "../components/my_answer_btn";
import { gaLog } from "../services/firebase";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
} from "../services/question";
import styles from "../styles.module.css";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<{}>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const [isKeywordsOn, setIsKeywordsOn] = useState<Boolean>(true);
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.ct}>
      <header className={styles.header}>
        <MyAnswerButton goBack={goBackFromMyAnswer} />
      </header>
      <KeywordList
        questions={questions}
        handleClickKeyword={handleClickKeyword}
      />
    </div>
  );
};
