import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { Question } from "../model/interfaces";
import { getToday } from "../services/DateManager";

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
  width: 178px;
  height: 48px;

  border-radius: 24px;
  border: 1px solid #cccccc;

  font-size: 18px;

  background-color: white;

  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {}

const Home: React.FC<Props> = () => {
  // const { data: questions, loading } = useFireDBFetch<any>("questions");

  // if (loading) {
  //   return <Loader />;
  // }

  // const todayQuestions = Object.keys(questions)
  //   .filter((qid) => questions[qid].publish_date === getToday())
  //   .map((qid) => questions[qid]);

  // console.log(todayQuestions);

  // if (loading) {
  //   return <>loading...</>;
  // }

  const todayQuestions = [
    { qid: 1, keyword: "과자", question: "ㅁㄴㅇ" },
    { qid: 2, keyword: "자유", question: "ㅁㄴㅇ" },
    { qid: 3, keyword: "여행", question: "ㅁㄴㅇ" },
  ];

  return (
    <Container>
      <Title>키워드를 선택해주세요.</Title>
      <KeywordList>
        {todayQuestions.map((q) => (
          <Keyword key={q.qid}>
            <Link to={`/question/${q.qid}`}>{q.keyword}</Link>
          </Keyword>
        ))}
      </KeywordList>
    </Container>
  );
};

export default Home;
