import React from 'react';
import styled from 'styled-components';
import { dayString, useMoment } from '../../hooks/useMoment';
import { QidAnswersData } from '../../models/AnswerModels';
import AnswerCard from './AnswerCard';

interface Props {
  dateString: string;
  answers: QidAnswersData;
}
const AnswerCardsByDay: React.FC<Props> = ({ answers, dateString }) => {
  const { date } = useMoment(dateString);

  return (
    <Container>
      <DayText>{dayString(date.day())}요일</DayText>
      <AnswerList>
        {Object.keys(answers).map((qid) => (
          <AnswerCard.Border key={qid} answers={answers[qid].answers} />
        ))}
      </AnswerList>
    </Container>
  );
};

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

export default AnswerCardsByDay;
