import React from "react";
import styled from "styled-components";
import DateAnswersCard from "../../components/DateAnswersCard";
import UserProfile from "../../components/UserProfile";
import { FetchedAnswers } from "../../model/interfaces";
import { formatAnswersToDateQidAnswers } from "../../services/utils";

interface Props {
  answers: FetchedAnswers;
}

const DailyAnswers: React.FC<Props> = ({ answers }) => {
  const dateQidAnswers = formatAnswersToDateQidAnswers(answers);
  const descendingDates = Object.keys(dateQidAnswers).sort((a, b) =>
    a > b ? -1 : 1
  );

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
            questionsWithAnswers={dateQidAnswers[date]}
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
