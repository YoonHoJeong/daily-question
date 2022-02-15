import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBoardAnswers } from "../services/fireDB";
import AnswersByDay from "../components/AnswersByDay";
import { DailyAnswersWithQuestions } from "../model/interfaces";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";
import { usePreloadImages } from "../hooks/usePreloadImages";
import HeartColored from "../assets/4_heart.svg";
import HeartUnColored from "../assets/4_heart2.svg";

const Container = styled.ul`
  background-color: white;

  padding-bottom: ${(props) => props.theme.sizes.bottomNavHeight};
`;

interface Props {}

const Board: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<DailyAnswersWithQuestions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useAuth();
  const uid = auth.user?.uid || "";
  const { loading: imageLoading } = usePreloadImages([
    HeartColored,
    HeartUnColored,
  ]);

  useEffect(() => {
    async function fetchData() {
      const data = await getBoardAnswers();
      setAnswers(data);
      setLoading(false);
    }

    fetchData();
  }, [uid]);

  const descendingDates = Object.keys(answers).sort((a, b) => (a > b ? -1 : 1));

  if (loading || imageLoading) {
    return <Loader />;
  }
  return (
    <Container>
      {descendingDates.map((date) => (
        <AnswersByDay key={date} date={date} answers={answers[date]} />
      ))}
    </Container>
  );
};

export default Board;
