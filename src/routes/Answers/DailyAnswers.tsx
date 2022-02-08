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
  background-color: ${(props) => props.theme.palette.white};
  padding: 40px 25px;
`;
const DailyAnswersList = styled.ul`
  width: 100%;
`;

const DailyAnswers: React.FC<Props> = ({ answers }) => {
  let monthAnswers = {};
  Object.keys(answers).forEach((week) => {
    Object.keys(answers[week]).forEach((date) => {
      if (!Object.keys(monthAnswers).includes(date)) monthAnswers[date] = {};
      Object.keys(answers[week][date]).forEach((aid) => {
        const answer = answers[week][date][aid];

        if (!Object.keys(monthAnswers[date]).includes(answer.question.keyword))
          monthAnswers[date][answer.question.qid] = {
            ...answer.question,
            answers: {},
          };
        monthAnswers[date][answer.question.qid].answers[aid] = { ...answer };
      });
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
            <AnswersByDay
              key={date}
              date={date}
              answers={monthAnswers[date]}
              profileOn={true}
            />
          ))}
      </DailyAnswersList>
    </Container>
  );
};

export default DailyAnswers;
