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
import Loader from "../components/Loader";
// import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useFireDBFetch } from "../hooks/useFireDBFetch";
import { useForm } from "../hooks/useForm";
import { Answer, Question, QuestionsObj } from "../model/interfaces";
import { firebaseApp } from "../services/firebase";
import {
  getAnswerByUidQid,
  getQuestionByQid,
  submitAnswer,
} from "../services/fireDB";

const Container = styled.form`
  width: 100%;
  height: 100%;
  padding: 0px 40px;

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

  white-space: pre-line;

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

interface Props {
  questions: QuestionsObj;
}
interface QuestionScreenParams {
  qid: string;
}

const QuestionScreen: React.FC<Props> = ({ questions }) => {
  const [editing, setEditing] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const params = useParams<QuestionScreenParams>();
  const auth = useAuth();
  const qid = params.qid;
  const uid = auth?.user?.uid || "";
  const question = questions[qid];

  const { form, setForm, onChange } = useForm({ answer: "" });
  const history = useHistory();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!form.answer) {
      alert("답변을 작성해 주세요.");
      return;
    }
    if (question) {
      setSubmitting(true);
      const success = await submitAnswer(uid, { ...question, qid }, form);
      setSubmitting(false);

      if (success) {
        history.push("/submit-done");
      } else {
        alert("답변 제출에 실패했습니다.");
      }
    }
  };

  const onEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  useEffect(() => {
    async function fetchData() {
      const answer = await getAnswerByUidQid(uid, qid);
      if (answer) {
        setEditing(false);
        setForm({ answer: answer?.answer, aid: answer?.aid });
      }

      setLoading(false);
    }
    fetchData();
  }, [qid, uid, setForm]);

  if (loading || submitting) {
    return <Loader />;
  }

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
