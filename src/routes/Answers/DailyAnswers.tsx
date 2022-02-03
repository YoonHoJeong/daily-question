import React from "react";
import styled from "styled-components";
import AnswersByDay from "../../components/AnswersByDay";
import UserProfile from "../../components/UserProfile";
import { UserAnswers } from "./Answers";

interface Props {
  answers: UserAnswers;
}

const Container = styled.div`
  width: 100%;
`;
const UserProfileContainer = styled.div`
  padding: 40px 25px;
`;
const DailyAnswersList = styled.ul`
  width: 100%;
`;

const DailyAnswers: React.FC<Props> = ({ answers }) => {
  let monthAnswers = {};
  Object.keys(answers).forEach((week) => {
    Object.keys(answers[week]).forEach((date) => {
      monthAnswers = { ...monthAnswers, ...answers[week] };
    });
  });

  return (
    <Container>
      <UserProfileContainer>
        <UserProfile />
      </UserProfileContainer>
      <DailyAnswersList>
        {Object.keys(monthAnswers)
          .reverse()
          .map((date) => (
            <AnswersByDay key={date} date={date} answers={monthAnswers[date]} />
          ))}
      </DailyAnswersList>
    </Container>
  );
};

export default DailyAnswers;
