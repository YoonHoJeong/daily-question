import { CircularProgress } from "@mui/material";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { useForm } from "../hooks/useForm";
import { Answer, Question } from "../model/interfaces";
import { firebaseApp } from "../services/firebase";
import { submitAnswer } from "../services/fireDB";

const Container = styled.form`
  width: 100%;
  height: 100%;
`;

const QuestionText = styled.p``;

const AnswerInput = styled.textarea``;

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(true);
  const params = useParams<{ qid: string }>();
  const auth = useAuth();
  const qid = params.qid || "";
  const uid = auth?.user?.uid || "";

  const [submitting, setSubmitting] = useState(false);
  const { form, setForm, onChange } = useForm({ answer: "" });
  const {
    data: question,
    loading: questionLoading,
    error: qError,
  } = useFireDBFetch<Question>(`questions/${qid}`);

  const history = useHistory();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!form.answer) {
      alert("답변을 작성해 주세요.");
      return;
    }

    setSubmitting(true);
    await submitAnswer(uid, qid, form);
    setSubmitting(false);
    history.push("/submit-done");
  };

  const onEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  useEffect(() => {
    async function fetchData() {
      const answerSnapshot = await get(
        query(
          ref(getDatabase(firebaseApp), "answers"),
          orderByChild("uid"),
          equalTo(uid)
        )
      );

      const userAnswers = answerSnapshot.val();
      const userAnswerByQid = Object.keys(userAnswers)
        .filter((aid) => userAnswers[aid].qid === qid)
        .map((aid) => userAnswers[aid])
        .pop();

      if (userAnswerByQid) {
        setEditing(false);
      }

      setLoading(false);
      setForm({ answer: userAnswerByQid.answer, aid: userAnswerByQid.aid });
    }
    fetchData();
  }, [qid, uid]);

  if (questionLoading || loading || submitting) {
    return <CircularProgress />;
  }

  return (
    <Container onSubmit={onSubmit}>
      <QuestionText>{question?.question}</QuestionText>
      <AnswerInput
        name="answer"
        value={form.answer}
        disabled={!editing}
        placeholder="답변"
        onChange={onChange}
      ></AnswerInput>
      {editing ? (
        <Button type="submit" variant="contained">
          답변 제출하기
        </Button>
      ) : (
        <Button variant="contained" onClick={onEdit}>
          답변 수정하기
        </Button>
      )}
    </Container>
  );
};

export default QuestionScreen;
