import React, { SyntheticEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/common/Loader";
import {
  useFetchUserAnswers,
  useFetchQuestions,
} from "../hooks/customUseQueries";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { submitAnswer } from "../services/fireDB";

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  const { qid } = useParams<{ qid: string }>();
  const auth = useAuth();
  const uid = auth?.user?.uid || "";

  const [submitting, setSubmitting] = useState(false);
  const { data: questions } = useFetchQuestions();
  const { data: answers, isLoading } = useFetchUserAnswers(uid);

  const question = questions && questions[qid];
  const answer =
    answers &&
    Object.keys(answers)
      .filter((aid) => answers[aid].qid === qid)
      .map((aid) => answers[aid])
      .pop();

  const { form, onChange } = useForm({
    answer: answer?.answer || "",
    aid: "",
  });
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

  return (
    <Container onSubmit={onSubmit}>
      {isLoading || submitting ? (
        <Loader />
      ) : (
        <>
          <QuestionText>{question?.question}</QuestionText>
          <AnswerInput
            name="answer"
            value={form.answer}
            placeholder="답변"
            rows={5}
            onChange={onChange}
            disabled={submitting}
          ></AnswerInput>
          <Button type="submit">오늘의 답변 기록하기</Button>
        </>
      )}
    </Container>
  );
};

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
  font-size: 18px;

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

  font-size: 14px;
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

export default QuestionScreen;
