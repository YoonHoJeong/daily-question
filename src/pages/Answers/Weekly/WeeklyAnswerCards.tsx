import React from "react";
import styled from "styled-components";
import DateAnswerItem from "./DateAnswerItem";

interface Props {
  weekAnswers: { [date: string]: {} };
}

const WeeklyAnswerCards: React.FC<Props> = ({ weekAnswers }) => {
  return (
    <Container>
      {Object.keys(weekAnswers)
        .sort((a, b) => (a > b ? -1 : 1))
        .map((date) => (
          <DateAnswerItem key={date} date={date} answers={weekAnswers[date]} />
        ))}
    </Container>
  );
};

const Container = styled.ul`
  & > li:not(:first-child) {
    margin-top: 10px;
  }
`;

export default WeeklyAnswerCards;
