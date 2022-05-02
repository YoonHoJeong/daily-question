import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import AnswersByDay from '../../components/answer/AnswersByDay';
import { DateContainer } from '../../components/answer/AnswersByDayBoardView';
import { LoadScreen } from '../../components/common';
import UserProfile from '../../components/user/UserProfile';
import sizes from '../../constants/sizes';
import { useMoment } from '../../hooks';
import { useFetchMyAnswers } from '../../hooks/customUseQueries';

interface Props {}

const DailyAnswersPage: React.FC<Props> = () => {
  const { data } = useFetchMyAnswers();
  const { date } = useMoment('2022-03-03');

  if (!data) {
    return <LoadScreen />;
  }

  const answers = data.getMonthlyAnswers(date);

  return (
    <>
      <UserProfileContainer>
        <UserProfile editable={false} showEmail={false} />
      </UserProfileContainer>
      <DailyAnswersList>
        {answers.map((date) => (
          <AnswersByDay.Board key={date} date={moment(date)} answers={answers.get(date)} />
        ))}
      </DailyAnswersList>
    </>
  );
};

const UserProfileContainer = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.palette.white};
  padding: 40px 25px;

  border-bottom: ${sizes.borderSize} solid ${(props) => props.theme.palette.grey200};
`;
export const DailyAnswersList = styled.ul`
  width: 100%;

  & ${DateContainer} {
    border-bottom: 4px ${(props) => props.theme.palette.grey200} solid;
  }
`;

export default DailyAnswersPage;
