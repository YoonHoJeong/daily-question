import React from 'react';
import styled from 'styled-components';
import AnswersByDay from '../components/answer/AnswersByDay';
import LoadScreen from '../components/common/LoadScreen';
import { useFetchBoardAnswers } from '../hooks/customUseQueries';
import { BottomNavigation, Header } from '../components/layouts';
import { ClientLayout } from '../components/layouts/ClientLayout';
import { useMoment } from '../hooks/useMoment';

interface Props {}

const BoardPage: React.FC<Props> = () => {
  const { data, isLoading, isError } = useFetchBoardAnswers();
  const answers = data ?? {};
  const moment = useMoment();
  const descendingDates = Object.keys(answers).sort((a, b) => (a > b ? -1 : 1));

  if (isError) return <>Error</>;

  return (
    <ClientLayout>
      <Header />
      {isLoading ? (
        <LoadScreen />
      ) : (
        descendingDates.map((date) => <AnswersByDay key={date} date={moment} answers={answers[date]} />)
      )}
      <BottomNavigation />
    </ClientLayout>
  );
};

export default BoardPage;
