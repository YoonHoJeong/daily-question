import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { UseMomentValue } from '../../hooks/useMoment';
import { QidAnswersData } from '../../models/AnswerModels';
import QuestionCard from './QuestionCard';

interface Props {
  date: moment.Moment;
  answers: QidAnswersData;
  profileOn?: boolean;
}

const AnswersByDay: React.FC<Props> = ({ date, answers, profileOn = false }) => {
  return (
    <DateContainer>
      <SideDateBar>
        <MonthDate>
          <Month>{date.month()}월</Month>
          <Date>{date.date()}</Date>
        </MonthDate>
      </SideDateBar>
      <QuestionCards>
        {Object.keys(answers).map((qid) => (
          <QuestionCard
            key={qid}
            question={answers[qid].question}
            answers={answers[qid].answers}
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

export default AnswersByDay;
