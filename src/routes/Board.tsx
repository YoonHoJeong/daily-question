import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBoardAnswers } from "../services/fireDB";
import AnswersByDay from "../components/AnswersByDay";
import Loader from "../components/Loader";
interface Props {}

const Container = styled.ul`
  height: 100%;

  background-color: white;
`;

const Board: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getBoardAnswers();
      setAnswers(data);
      setLoading(false);
      console.log(data);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {Object.keys(answers).map((date) => (
        <AnswersByDay key={date} date={date} answers={answers[date]} />
      ))}
    </Container>
  );
};

export default Board;
