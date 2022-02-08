import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBoardAnswers } from "../services/fireDB";
import AnswersByDay from "../components/AnswersByDay";
import Loader from "../components/Loader";
interface Props {}

const Container = styled.ul`
  background-color: white;

  padding-bottom: ${(props) => props.theme.sizes.bottomNavHeight};
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
      {loading ? (
        <Loader />
      ) : (
        Object.keys(answers)
          .sort((a, b) => (a > b ? -1 : 1))
          .map((date) => (
            <AnswersByDay key={date} date={date} answers={answers[date]} />
          ))
      )}
    </Container>
  );
};

export default Board;
