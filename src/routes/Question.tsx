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
// import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { useForm } from "../hooks/useForm";
import { Answer, Question } from "../model/interfaces";
import { firebaseApp } from "../services/firebase";
import { submitAnswer } from "../services/fireDB";

const Container = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const QuestionText = styled.p`
  font-size: 16px;

  width: 100%;
  margin-bottom: 20px;

  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: flex-end;

  color: #4d4d4d;
`;

const AnswerInput = styled.textarea`
  width: 100%;

  border: 1px solid #cccccc;

  padding: 12px 15px;
`;

const Button = styled.button`
  width: 100%;

  background: #515fa9;
  border: none;
  border-radius: 50px;

  padding: 12px;

  color: white;
  font-size: 16px;
  font-weight: 500;

  margin-top: 15px;
`;

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(true);
  // const params = useParams<{ qid: string }>();
  // const auth = useAuth();
  // const qid = params.qid || "";
  // const uid = auth?.user?.uid || "";

  const [submitting, setSubmitting] = useState(false);
  const { form, setForm, onChange } = useForm({ answer: "" });
  // const {
  //   data: question,
  //   loading: questionLoading,
  //   error: qError,
  // } = useFireDBFetch<Question>(`questions/${qid}`);

  const history = useHistory();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!form.answer) {
      alert("답변을 작성해 주세요.");
      return;
    }

    setSubmitting(true);
    // await submitAnswer(uid, qid, form);
    setSubmitting(false);
    history.push("/submit-done");
  };

  const onEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const answerSnapshot = await get(
  //       query(
  //         ref(getDatabase(firebaseApp), "answers"),
  //         orderByChild("uid"),
  //         equalTo(uid)
  //       )
  //     );

  //     const userAnswers = answerSnapshot.val();
  //     const userAnswerByQid: Answer = Object.keys(userAnswers)
  //       .filter((aid) => userAnswers[aid].qid === qid)
  //       .map((aid) => userAnswers[aid])
  //       .pop();

  //     if (userAnswerByQid) {
  //       setEditing(false);
  //     }

  //     setLoading(false);
  //     setForm({ answer: userAnswerByQid?.answer, aid: userAnswerByQid?.aid });
  //   }
  //   fetchData();
  // }, [qid, uid, setForm]);

  // if (questionLoading || loading || submitting) {
  //   return <>loading...</>;
  // }

  const question = {
    qid: 1,
    question:
      "당신이 제일 좋아하는 과자는 무엇인가요? \n 그 과자에 얽힌 추억이 있다면 알려주세요.",
  };

  return (
    <Container onSubmit={onSubmit}>
      <QuestionText>{question?.question}</QuestionText>
      <AnswerInput
        name="answer"
        value={form.answer}
        disabled={!editing}
        placeholder="답변"
        rows={5}
        onChange={onChange}
      ></AnswerInput>
      {editing ? (
        <Button type="submit">오늘의 답변 기록하기</Button>
      ) : (
        <Button onClick={onEdit}>오늘의 답변 수정하기</Button>
      )}
    </Container>
  );
};

export default QuestionScreen;
