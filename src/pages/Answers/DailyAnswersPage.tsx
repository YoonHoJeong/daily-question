import React, { useMemo } from 'react';
import styled from 'styled-components';
import AnswersByDay from '../../components/answer/AnswersByDay';
import { BottomNavigation, Header } from '../../components/layouts';
import UserProfile from '../../components/user/UserProfile';
import { useMoment } from '../../hooks';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { AnswersWrapper } from '../../services/AnswerApi';

interface Props {
  // answers: AnswersWrapper;
}

const DailyAnswersPage: React.FC<Props> = () => {
  // const dateQidAnswers = answers.getDateQidAnswers();
  // const descendingDates = answers.getDatesDescending();
  const { data: answers } = useMyAnswers();
  const { date } = useMoment();
  console.log(answers?.getMonthlyAnswers(date).data);

  return (
    <>
      DailyAnswers
      {/* <UserProfileContainer>
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
      </DailyAnswersList> */}
    </>
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

export default DailyAnswersPage;
