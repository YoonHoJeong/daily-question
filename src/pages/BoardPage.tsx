import React from "react";
import styled from "styled-components";
import DateAnswersCard from "../components/DateAnswersCard";
import LoadScreen from "../components/common/LoadScreen";
import { useFetchBoardAnswers } from "../hooks/customUseQueries";
import { BottomNavigation, Header } from "../components/layouts";
import { ClientLayout } from "../components/layouts/ClientLayout";

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
        descendingDates.map((date) => (
          <DateAnswersCard
            key={date}
            date={date}
            questionsWithAnswers={answers[date]}
          />
        ))
      )}
      <BottomNavigation />
    </ClientLayout>
  );
};

export default BoardPage;
