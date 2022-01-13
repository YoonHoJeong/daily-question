import { get, getDatabase, ref } from "firebase/database";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { Question } from "../model/interfaces";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const QuestionText = styled.p``;

const AnswerInput = styled.textarea``;

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  const params = useParams<{ qid: string }>();
  const qid = params.qid || "";
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const db = getDatabase();

    const snapshot = await get(ref(db, `questions/${qid}`));
    const fetched = snapshot.val();
    setQuestion(fetched);
    setLoading(false);
  }

  if (qid) {
    fetchData();
  }

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Container>
      <QuestionText>{question?.question}</QuestionText>
      <AnswerInput placeholder="답변"></AnswerInput>
      <Button variant="contained">답변 제출하기</Button>
    </Container>
  );
};

export default QuestionScreen;
