import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import AnswerCard from "../components/AnswerCard";
import { useAuth } from "../hooks/useAuth";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { Answer } from "../model/interfaces";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Weeks = styled.ul``;
const Week = styled.li``;
const Dates = styled.ul``;
const Date = styled.li``;

const AnswerList = styled.ul``;

const HelperText = styled.p``;
const AnswerDateCount = styled.span``;

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  const {
    data: answers,
    loading,
    error,
  } = useFireDBFetch<{ [aid: string]: Answer }>(`answers/`, {
    by: "uid",
    value: uid,
  });

  useEffect(() => {
    console.log("mount");
  }, []);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Container>
      <Weeks>
        <Week>2021년 12월 2주차</Week>
        <Week>2021년 12월 3주차</Week>
        <Week>2021년 12월 4주차</Week>
      </Weeks>

      <HelperText>
        5일 중 <AnswerDateCount>1일</AnswerDateCount> 대답했어요.
      </HelperText>
      <Dates>
        <Date>1</Date>
        <Date>2</Date>
        <Date>3</Date>
        <Date>4</Date>
        <Date>5</Date>
      </Dates>

      <AnswerList>
        {Object.keys(answers).map((aid) => (
          <AnswerCard key={answers[aid].aid} answer={answers[aid]} />
        ))}
      </AnswerList>
    </Container>
  );
};

export default Answers;
