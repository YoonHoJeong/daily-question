import React from "react";
import styled from "styled-components";
import DateAnswersCard from "../components/DateAnswersCard";
import Loader from "../components/common/Loader";
import { usePreloadImages } from "../hooks/usePreloadImages";
import HeartColored from "../assets/4_heart.svg";
import HeartUnColored from "../assets/4_heart2.svg";
import { useFetchRecentAnswers } from "../hooks/customUseQueries";
import { FetchedAnswers } from "../model/interfaces";
import { getDateQuestionAnswers } from "../services/fireDB";

interface Props {}

function getDescendingDatesFromAnswers(answers: FetchedAnswers) {
  const datesObj = {};
  console.log(answers);

  Object.keys(answers).forEach((aid) => {
    const date = answers[aid].question.publish_date;
    datesObj[date] = true;
  });
  const dates = Object.keys(datesObj).sort((a, b) => (a > b ? -1 : 1));

  return dates;
}

const Board: React.FC<Props> = () => {
  const { loading: imageLoading } = usePreloadImages([
    HeartColored,
    HeartUnColored,
  ]);

  const { data, isLoading, isError } = useFetchRecentAnswers();

  const answers = data ?? {};
  const descendingDates = getDescendingDatesFromAnswers(answers);

  if (isError) return <>Error</>;

  async function fetchData() {
    await getDateQuestionAnswers();
  }
  fetchData();

  return (
    <ViewWindow>
      {isLoading || imageLoading ? (
        <Loader />
      ) : (
        descendingDates.map((date) => (
          <DateAnswersCard key={date} date={date} answers={{}} />
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
