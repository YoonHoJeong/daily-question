import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import QuestionItem from "../../components/QuestionItem";
import { useFireDBFetch } from "../../hooks/useFireDBFetch";
import { useForm } from "../../hooks/useForm";
import { getToday } from "../../services/DateManager";
import { enrollQuestion } from "../../services/fireDB";

interface Props {}

const TodayQuestions = styled.ul``;
const QuestionForm = styled.form``;

const AdminQuestions: React.FC<Props> = () => {
  const { form, onChange } = useForm({
    keyword: "",
    question: "",
    publish_date: "",
  });
  const {
    data: questions,
    loading,
    refresh,
  } = useFireDBFetch<any>("questions");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const flag = await enrollQuestion(
      form.keyword,
      form.question,
      form.publish_date
    );
    if (flag) {
      window.confirm("등록되었습니다.");
      refresh();
      (e.target as HTMLFormElement).reset();
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  const todayDate = getToday();
  const todayQuestions = Object.keys(questions)
    .filter((qid) => questions[qid].publish_date === todayDate)
    .map((qid) => <QuestionItem key={qid} question={questions[qid]} />);

  return (
    <div>
      <div>{todayDate}질문</div>
      <TodayQuestions>
        {todayQuestions.length > 0 ? (
          Object.keys(questions)
            .filter((qid) => questions[qid].publish_date === todayDate)
            .map((qid) => <QuestionItem key={qid} question={questions[qid]} />)
        ) : (
          <span>오늘 등록된 질문이 없습니다.</span>
        )}
      </TodayQuestions>
      <QuestionForm onSubmit={onSubmit}>
        <span>질문 등록하기</span>
        <input name="publish_date" type="date" onChange={onChange} />
        <input
          name="keyword"
          type="text"
          placeholder="키워드"
          onChange={onChange}
        />
        <textarea name="question" placeholder="질문" onChange={onChange} />
        <button type="submit">질문 등록</button>
      </QuestionForm>
    </div>
  );
};

export default AdminQuestions;
