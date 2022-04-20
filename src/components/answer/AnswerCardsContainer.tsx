import React from 'react';
import styled from 'styled-components';
import { DateQidAnswersData } from '../../models/AnswerModels';
import AnswersByDayCardView from './AnswersByDayCardView';

interface Props {
  answers: DateQidAnswersData;
}

const AnswerCardsContainer: React.FC<Props> = ({ answers }) => {
  return (
    <Container>
      {Object.keys(answers)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((date) => (
          <AnswersByDayCardView key={date} dateString={date} answers={answers[date]} />
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
