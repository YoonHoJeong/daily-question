import React from 'react';
import styled from 'styled-components';
import { DateQidAnswersData } from '../../models/AnswerModels';
import AnswerCardsByDay from './AnswerCardsByDay';

interface Props {
  answers: DateQidAnswersData;
}

const AnswerCardsContainer: React.FC<Props> = ({ answers }) => {
  return (
    <Container>
      {Object.keys(answers)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((date) => (
          <AnswerCardsByDay key={date} date={date} answers={answers[date]} />
        ))}
    </Container>
  );
};

const Container = styled.ul`
  & > li:not(:first-child) {
    margin-top: 10px;
  }
`;

export default AnswerCardsContainer;
