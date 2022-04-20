import React from 'react';
import styled from 'styled-components';
import AnswersByDayBoardView, { DateContainer } from '../components/answer/AnswersByDayBoardView';
import LoadScreen from '../components/common/LoadScreen';
import { useFetchBoardAnswers } from '../hooks/customUseQueries';
import { BottomNavigation, Header } from '../components/layouts';
import { ClientLayout as Layout } from '../components/layouts/ClientLayout';
import moment from 'moment';

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const { data, isLoading, isError } = useFetchBoardAnswers();
  const answers = data ?? {};
  const descendingDates = Object.keys(answers).sort((a, b) => (a > b ? -1 : 1));

  if (isError) return <>Error</>;

  return (
    <ClientLayout>
      <Header />
      {isLoading ? (
        <LoadScreen />
      ) : (
        descendingDates.map((date) => <AnswersByDayBoardView key={date} date={moment(date)} answers={answers[date]} />)
      )}
      <BottomNavigation />
    </ClientLayout>
  );
};

const ClientLayout = styled(Layout)`
  & ${DateContainer} {
    border-bottom: 4px ${(props) => props.theme.palette.grey200} solid;
  }
`;

export default BoardPage;
