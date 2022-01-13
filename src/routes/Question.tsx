import { get, getDatabase, ref } from "firebase/database";
import React, { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useForm } from "../hooks/useForm";
import { Question } from "../model/interfaces";

const Container = styled.form`
  width: 100%;
  height: 100%;
`;

const QuestionText = styled.p``;

const AnswerInput = styled.textarea``;

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  const params = useParams<{ qid: string }>();
  const { form, onChange } = useForm({ answer: "" });
  const qid = params.qid || "";
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(form);
  };

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
    <Container onSubmit={onSubmit}>
      <QuestionText>{question?.question}</QuestionText>
      <AnswerInput
        name="answer"
        placeholder="답변"
        onChange={onChange}
      ></AnswerInput>
      <Button type="submit" variant="contained">
        답변 제출하기
      </Button>
    </Container>
  );
};

export default QuestionScreen;
