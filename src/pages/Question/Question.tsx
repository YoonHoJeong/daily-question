import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import AnswerOptionCheckBoxes from "../components/AnswerOptionCheckBoxes";
import Loader from "../components/common/Loader";
import {
  useFetchQuestions,
  useFetchUserAnswers,
} from "../hooks/customUseQueries";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { submitAnswer } from "../services/fireDB";

interface Props {}

const QuestionScreen: React.FC<Props> = () => {
  const { qid } = useParams<{ qid: string }>();
  const auth = useAuth();
  const user = auth?.user;

  const [submitting, setSubmitting] = useState(false);
  const { data: questions } = useFetchQuestions();
  const question = questions && questions[qid];

  const answerRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    answerRef?.current?.focus();
  }, []);

  const {
    data,
    isLoading,
    refetch: userAnswersRefetch,
  } = useFetchUserAnswers(user!!.uid);

  const { refetch: questionsRefetch } = useFetchQuestions();
  const userAnswers = data ?? {};
  const answer = Object.keys(userAnswers)
    .filter((aid) => userAnswers[aid].qid === qid)
    .map((aid) => userAnswers[aid])
    .pop();

  const { form, onChange, setProperty } = useForm({
    answer: answer?.answer ?? "",
    aid: answer?.aid ?? "",
    isPublic: answer?.isPublic ?? false,
    isAnonymous: answer?.isAnonymous ?? false,
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
      try {
        await submitAnswer(
          { uid: user!!.uid, profile: user!!.profile },
          question,
          form
        );
        await userAnswersRefetch();
        await questionsRefetch();
        setSubmitting(false);
        history.push("/submit-done");
      } catch (e) {
        console.log(e);

        alert("기록에 실패했습니다. 다시 시도해주세요.");
        setSubmitting(false);
      }
    }
  };
  const onClickCheckbox = (e: SyntheticEvent) => {
    const elem = e.currentTarget as HTMLInputElement;
    const key = elem.name;
    const value = elem.checked;
    setProperty(key, value);
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
            ref={answerRef}
          ></AnswerInput>
          <AnswerOptionCheckBoxes
            form={form}
            onClickCheckbox={onClickCheckbox}
          />
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
