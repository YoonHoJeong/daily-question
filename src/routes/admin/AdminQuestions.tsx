import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import QuestionItem from "../../components/QuestionItem";
import { useForm } from "../../hooks/useForm";
import { getToday } from "../../services/DateManager";
import AdminApi from "../../services/AdminApi";
import { FetchedQuestions } from "../../model/interfaces";

interface Props {}

const TodayQuestions = styled.ul``;
const QuestionFormContainer = styled.form``;

interface QuestionsProps {
  loading: boolean;
  questions: FetchedQuestions;
  date: string;
  onDateChange: (e: SyntheticEvent) => void;
}
const QuestionsViewer: React.FC<QuestionsProps> = ({
  loading,
  questions,
  date,
  onDateChange,
}) => {
  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <input type="date" defaultValue={date} onChange={onDateChange} />
      <TodayQuestions>
        {Object.keys(questions).length > 0 ? (
          Object.keys(questions).map((qid) => (
            <QuestionItem key={qid} question={questions[qid]} />
          ))
        ) : (
          <span>등록된 질문이 없습니다.</span>
        )}
      </TodayQuestions>
    </>
  );
};

interface QuestionFormProps {
  onSubmit: (e: SyntheticEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  defaultDate: string;
}

const QuestionEnrollForm: React.FC<QuestionFormProps> = React.memo(
  ({ onSubmit, onInputChange, defaultDate }) => {
    return (
      <QuestionFormContainer onSubmit={onSubmit}>
        <span>질문 등록하기</span>
        <input
          required
          name="publish_date"
          type="date"
          defaultValue={defaultDate}
          onChange={onInputChange}
        />
        <input
          required
          name="keyword"
          type="text"
          placeholder="키워드"
          onChange={onInputChange}
        />
        <textarea
          required
          name="question"
          placeholder="질문"
          onChange={onInputChange}
        />
        <button type="submit">질문 등록</button>
      </QuestionFormContainer>
    );
  }
);

const AdminQuestions: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<FetchedQuestions>({});
  const [currentDate, setCurrentDate] = useState(getToday());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { form, onChange } = useForm({
    keyword: "",
    question: "",
    publish_date: currentDate,
  });

  const onDateChange = (e: SyntheticEvent) =>
    setCurrentDate((e.target as HTMLInputElement).value);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await AdminApi.question.enroll(form);
      window.confirm("등록되었습니다.");
      (e.target as HTMLFormElement).reset();
      fetchData();
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const questions = await AdminApi.question.getfilteredByDate(currentDate);
    setQuestions(questions);
    setLoading(false);
  }, [currentDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <>404</>;
  }

  return (
    <div>
      <QuestionsViewer
        loading={loading}
        questions={questions}
        date={currentDate}
        onDateChange={onDateChange}
      />
      <QuestionEnrollForm
        onInputChange={onChange}
        onSubmit={onSubmit}
        defaultDate={getToday()}
      />
    </div>
  );
};

export default AdminQuestions;
