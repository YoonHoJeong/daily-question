import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { KeywordList } from "../../components/keyword_list";
import { getTodayQuestions } from "../../services/question";
import { Route, useHistory, useLocation } from "react-router";
import { sendPageView } from "../../app";

interface Props {}

export const Keywords: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<{}>({});
  const [qid, setQid] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const history = useHistory();
  const location = useLocation();
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
    sendPageView();
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
      <Route path={`${location.pathname}`}>
        <KeywordList
          questions={questions}
          handleClickKeyword={handleClickKeyword}
        />
      </Route>
      <Route path={`${location.pathname}/:qid`}>{qid}</Route>
    </>
  );
};
