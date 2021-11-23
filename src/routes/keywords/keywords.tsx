import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { KeywordList } from "../../components/keyword_list";
import { getTodayQuestions } from "../../services/question";
import { useHistory } from "react-router";

interface Props {}

export const Keywords: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<{}>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const history = useHistory();
  const handleClickKeyword: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const { name: qid } = e.currentTarget as HTMLInputElement;

    history.push({
      pathname: "/today-question",
      state: { qid },
    });
  };
  useEffect(() => {
    async function fetchQuestionsData() {
      const questionsData = await getTodayQuestions();
    setQuestions(questionsData);

      setLoading(false);
    }
    fetchQuestionsData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Header />
      <KeywordList
        questions={questions}
        handleClickKeyword={handleClickKeyword}
      />
    </>
  );
};
