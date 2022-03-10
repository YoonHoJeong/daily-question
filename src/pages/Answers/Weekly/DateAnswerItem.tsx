import React from "react";
import styled from "styled-components";
import { AnswerDataModel } from "../../../model/AnswerModels";
import { QuestionDataModel } from "../../../model/QuestionModels";
import { getDay } from "../../../services/DateManager";
import WeeklyAnswerCard from "./WeeklyAnswerCard";

interface Props {
  date: string;
  answers: {
    [qid: string]: {
      question: QuestionDataModel;
      answers: { [aid: string]: AnswerDataModel };
    };
  };
}
const DateAnswerItem: React.FC<Props> = ({ answers, date }) => {
  return (
    <Container>
      <DayText>{getDay(date)}</DayText>
      <AnswerList>
        {Object.keys(answers).map((qid) => (
          <WeeklyAnswerCard key={qid} answers={answers[qid].answers} />
        ))}
      </AnswerList>
    </Container>
  );
};

export default DateAnswerItem;

const Container = styled.li``;
const DayText = styled.p`
  font-weight: 500;

  margin-left: 10px;
  margin-bottom: 5px;
`;

const AnswerList = styled.ul`
  position: relative;

  flex-direction: column;
  display: flex;
  align-items: center;

  & > li:not(:first-child) {
    margin-top: 10px;
  }
`;
