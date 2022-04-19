import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { queryClient } from '../App';
import AnswerOptionCheckBoxes from '../components/answer/AnswerOptionCheckBoxes';
import LoadScreen from '../components/common/LoadScreen';
import { useFetchQuestions, useFetchUserAnswers } from '../hooks/customUseQueries';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { AnswerFormData } from '../models/AnswerModels';
import { useInternalRouter } from '../routes/useInternalRouter';

interface Props {}

const QuestionPage: React.FC<Props> = () => {
  // initial state
  const { qid } = useParams<{ qid: string }>();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // data fetching(question, answer)
  const { data: questions } = useFetchQuestions();

  // TODO : qid default?
  const question = questions!![qid ?? ''];

  const { data, isLoading } = useFetchUserAnswers(user!!.uid);

  const userAnswers = data ?? {};
  const answerData = Object.keys(userAnswers)
    .filter((aid) => userAnswers[aid].qid === qid)
    .map((aid) => userAnswers[aid])
    .pop();

  // form state setting
  const { form, onChange, setProperty } = useForm<AnswerFormData>({
    question,
    aid: answerData?.aid ?? '',
    answer: answerData?.answer ?? '',
    isPublic: answerData?.isPublic ?? false,
    isAnonymous: answerData?.isAnonymous ?? false,
  });

  // input focus
  const answerRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    answerRef?.current?.focus();
  }, []);

  const { push } = useInternalRouter();

  const mutation = useMutation(user!!.submitAnswer, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-answers');
      queryClient.invalidateQueries('questions');
    },
  });

  // form submit
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      mutation.mutate(form);
      push('/submit-done');
    } catch (e) {
      console.log(e);
      alert('기록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
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
        <LoadScreen />
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
            required
          ></AnswerInput>
          <AnswerOptionCheckBoxes form={form} onClickCheckbox={onClickCheckbox} />
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
  &:hover {
    cursor: pointer;
  }
`;

export default QuestionPage;
