import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import AnswersByDay from '../../components/answer/AnswersByDay';
import { DateContainer } from '../../components/answer/AnswersByDayBoardView';
import UserProfile from '../../components/user/UserProfile';
import { useMoment } from '../../hooks';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { DateQidAnswersWrapper } from '../../models/DateQidAnswersWrapper';

interface Props {}

const DailyAnswersPage: React.FC<Props> = () => {
  const { data } = useMyAnswers();

  const { date } = useMoment('2022-03-03');
  const answers = data?.getMonthlyAnswers(date) ?? DateQidAnswersWrapper({});

  return (
    <>
      <UserProfileContainer>
        <UserProfile editable={false} showEmail={false} />
      </UserProfileContainer>
      <DailyAnswersList>
        {Object.keys(answers.data)
          .sort((a, b) => (b > a ? 1 : -1))
          .map((date) => (
            <AnswersByDay.Board key={date} date={moment(date)} answers={answers.data[date]} />
          ))}
      </DailyAnswersList>
    </>
  );
};

const UserProfileContainer = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.palette.white};
  padding: 40px 25px;

  margin-bottom: 4px;
`;
export const DailyAnswersList = styled.ul`
  width: 100%;

  & ${DateContainer} {
    border-bottom: 4px ${(props) => props.theme.palette.grey200} solid;
  }
`;

export default DailyAnswersPage;
