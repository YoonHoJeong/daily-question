import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Question } from "../model/interfaces";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { firebaseApp, fireDB } from "../services/firebase";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { getToday } from "../services/DateManager";
import Loader from "../components/Loader";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div``;
const KeywordList = styled.ul``;
const Keyword = styled.li``;

interface Props {}

const Keywords: React.FC<Props> = () => {
  // const { data: questions, loading } = useFireDBFetch<Question[]>("questions");
  const [questions, setQuestions] = useState<Question[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await get(
        query(
          ref(fireDB, "questions"),
          orderByChild("publish_date"),
          equalTo(getToday())
        )
      );
      const questions = snapshot.val();
      const todayQuestions = Object.keys(questions)
        .filter((qid) => questions[qid].publish_date === getToday())
        .map((qid) => questions[qid]);
      console.log(todayQuestions);
      setQuestions(todayQuestions);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Title>키워드를 선택해주세요.</Title>
      <KeywordList>
        <Keyword>
          <Link to={`/question/${1}`}>
            <button>방어</button>
          </Link>
        </Keyword>
        <Keyword>
          <Link to={`/question/${2}`}>
            <button>칼로리</button>
          </Link>
        </Keyword>
        <Keyword>
          <Link to={`/question/${3}`}>
            <button>밈</button>
          </Link>
        </Keyword>
      </KeywordList>
    </Container>
  );
};

export default Keywords;
