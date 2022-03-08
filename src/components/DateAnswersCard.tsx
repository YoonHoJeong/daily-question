import React from "react";
import styled from "styled-components";
import { AnswerType, QuestionType } from "../model/interfaces";
import QuestionCard from "./QuestionCard";

interface Props {
  date: string;
  questionsWithAnswers: {
    [qid: string]: {
      question: QuestionType;
      answers: {
        [aid: string]: AnswerType;
      };
    };
  };
  profileOn?: boolean;
}

const DateAnswersCard: React.FC<Props> = ({
  date,
  questionsWithAnswers,
  profileOn = true,
}) => {
  const [_, month, day] = date.split("-");

  return (
    <DateContainer>
      <SideDateBar>
        <MonthDate>
          <Month>{parseInt(month)}월</Month>
          <Date>{parseInt(day)}</Date>
        </MonthDate>
      </SideDateBar>
      <QuestionCards>
        {Object.keys(questionsWithAnswers).map((qid) => (
          <QuestionCard
            key={qid}
            question={questionsWithAnswers[qid].question}
            answers={questionsWithAnswers[qid].answers}
            profileOn={profileOn}
          />
        ))}
      </QuestionCards>
    </DateContainer>
  );
};

const DateContainer = styled.li`
  width: 100%;
  padding: 17px 30px;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;

  border-top: 4px solid ${(props) => props.theme.palette.bgGrey};
`;
const SideDateBar = styled.div`
  display: flex;

  width: 40px;
`;
const MonthDate = styled.div``;
const Month = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  text-align: center;

  color: #888888;
`;
const Date = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  /* identical to box height */

  text-align: center;

  color: #4d4d4d;
`;

const QuestionCards = styled.ul`
  flex: 1;

  & > li {
    margin-left: 7px;
  }
  & > li:not(:first-child) {
    margin-top: 30px;
  }
`;

export default DateAnswersCard;
