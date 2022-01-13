import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Question } from "../model/interfaces";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.p``;
const KeywordList = styled.ul``;
const Keyword = styled.li``;

interface Props {}

const Home: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchQuestion() {
    const db = getDatabase();
    const questionsRef = ref(db, "/questions");
    const fetchedData = (await get(questionsRef)).val();
    const questionsData = Object.keys(fetchedData).map(
      (qid) => fetchedData[qid]
    );

    setQuestions(questionsData.slice(0, 3));
    setLoading(false);
  }
  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Container>
      <Title>오늘의 질문</Title>
      <KeywordList>
        {questions.map((q) => (
          <Keyword key={q.qid}>
            <Link to={`/question/${q.qid}`}>
              <button>{q.keyword}</button>
            </Link>
          </Keyword>
        ))}
      </KeywordList>
    </Container>
  );
};

export default Home;
