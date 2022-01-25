import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Loader from "../components/Loader";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { QuestionsObj } from "../model/interfaces";
import { getToday } from "../services/DateManager";
import { getTodayQuestions } from "../services/fireDB";
import { Answers, Question, SubmitDone } from "../routes";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 18px;

  margin-bottom: 15px;
`;
const KeywordList = styled.ul``;
const Keyword = styled.li`
  font-size: 18px;
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {}

const Home: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<QuestionsObj>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetched = await getTodayQuestions();
      setQuestions(fetched);

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Switch>
      <Route path="/question/:qid">
        {questions ? <Question questions={questions} /> : <>server error</>}
      </Route>
      <Route exact path="/">
        <Container>
          {questions ? (
            <>
              <Title>키워드를 선택해주세요.</Title>
              <KeywordList>
                {Object.keys(questions).map((qid) => (
                  <Keyword key={qid}>
                    <Link to={`/question/${qid}`}>
                      <Button
                        small
                        style={{ fontSize: "18px", fontWeight: 500 }}
                      >
                        {questions[qid].keyword}
                      </Button>
                    </Link>
                  </Keyword>
                ))}
              </KeywordList>
            </>
          ) : (
            <Title>오늘은 질문이 없어요.</Title>
          )}
        </Container>
      </Route>
    </Switch>
  );
};

export default Home;
