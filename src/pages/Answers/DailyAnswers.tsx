import React, { useMemo } from "react";
import styled from "styled-components";
import DateAnswersCard from "../../components/DateAnswersCard";
import UserProfile from "../../components/user/UserProfile";
import { AnswersWrapper } from "../../services/AnswerApi";

interface Props {
  answers: AnswersWrapper;
}

const DailyAnswers: React.FC<Props> = ({ answers }) => {
  const dateQidAnswers = answers.getDateQidAnswers();
  const descendingDates = answers.getDatesDescending();

  return (
    <Container>
      <UserProfileContainer>
        <UserProfile editable={false} showEmail={false} />
      </UserProfileContainer>
      <DailyAnswersList>
        {descendingDates.map((date) => (
          <DateAnswersCard
            key={date}
            date={date}
            questionsWithAnswers={dateQidAnswers.data[date]}
            profileOn={false}
          />
        ))}
      </DailyAnswersList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
const UserProfileContainer = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  padding: 40px 25px;
`;
const DailyAnswersList = styled.ul`
  width: 100%;
`;

export default DailyAnswers;
