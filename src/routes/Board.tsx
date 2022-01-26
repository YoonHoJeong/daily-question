import React from "react";
import styled from "styled-components";
import AnswersByDay from "../components/AnswersByDay";
interface Props {}

const Container = styled.div`
  height: 100%;

  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Board: React.FC<Props> = () => {
  return (
    <Container>
      아직 준비 중이에요.
      {/* <AnswersByDay date={"2022-01-19"} answers={{}} />
      <AnswersByDay date={"2022-01-18"} answers={{}} />
      <AnswersByDay date={"2022-01-17"} answers={{}} /> */}
    </Container>
  );
};

export default Board;
