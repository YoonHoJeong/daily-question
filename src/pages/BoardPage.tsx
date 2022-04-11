import React from "react";
import styled from "styled-components";
import DateAnswersCard from "../components/DateAnswersCard";
import LoadScreen from "../components/common/LoadScreen";
import { useFetchBoardAnswers } from "../hooks/customUseQueries";

interface Props {}

const Board: React.FC<Props> = () => {
  const { data, isLoading, isError } = useFetchBoardAnswers();
  const answers = data ?? {};

  const descendingDates = Object.keys(answers).sort((a, b) => (a > b ? -1 : 1));

  if (isError) return <>Error</>;

  return (
    <ViewWindow>
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
    </ViewWindow>
  );
};

const ViewWindow = styled.ul`
  overflow-y: scroll;
  height: 100%;
`;

export default Board;
