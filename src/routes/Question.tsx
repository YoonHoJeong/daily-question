import { child, get, getDatabase, push, ref, update } from "firebase/database";
import React, { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Question } from "../model/interfaces";
import { convertDate } from "../services/DateManager";
import { firebaseApp } from "../services/firebase";

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
  const auth = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const db = getDatabase(firebaseApp);
    const aid = push(child(ref(db), "answers")).key;
    const uid = auth?.user?.uid; // undefined

    // TODO: validation check
    if (!uid) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const updates = {};

    const formData = {
      qid,
      aid,
      uid,
      answer: form.answer,
      created_at: convertDate(new Date()),
    };
    updates["/answers/" + aid] = formData;
    updates["/users/" + uid + "/answers/" + aid] = true;
    updates["/questions/" + qid + "/answers/" + aid] = true;

    try {
      update(ref(db), updates);
      alert("답변이 제출되었습니다 :)");
    } catch (e) {
      console.error(e);
    }
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
