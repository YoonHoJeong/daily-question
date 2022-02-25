import React from "react";
import styled from "styled-components";
import AnswersByDay from "../components/AnswersByDay";
import Loader from "../components/common/Loader";
import { usePreloadImages } from "../hooks/usePreloadImages";
import HeartColored from "../assets/4_heart.svg";
import HeartUnColored from "../assets/4_heart2.svg";
import { useFetchRecentAnswers } from "../hooks/customUseQueries";

interface Props {}

const Board: React.FC<Props> = () => {
  const { loading: imageLoading } = usePreloadImages([
    HeartColored,
    HeartUnColored,
  ]);

  const { data, isLoading, isError } = useFetchRecentAnswers();
  const answers = data ?? {};

  const descendingDates = Object.keys(answers).sort((a, b) => (a > b ? -1 : 1));

  if (isError) return <>Error</>;

  return (
    <Container>
      {isLoading || imageLoading ? (
        <Loader />
      ) : (
        descendingDates.map((date) => (
          <AnswersByDay key={date} date={date} answers={answers[date] || {}} />
        ))
      )}
    </Container>
  );
};

const Container = styled.ul`
  background-color: white;

  padding-bottom: ${(props) => props.theme.sizes.bottomNavHeight};
`;

export default Board;
