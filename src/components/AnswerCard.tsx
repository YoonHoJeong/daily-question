import React from "react";
import styled from "styled-components";
import { Answer } from "../model/interfaces";

const Container = styled.li``;
const KeywordText = styled.p``;
const QuestionText = styled.p``;
const AnswerText = styled.p``;

interface Props {
  answer: Answer;
}

const AnswerCard: React.FC<Props> = ({ answer }) => {
  return (
    <Container>
      <KeywordText>{answer.qid}</KeywordText>
      <QuestionText>Q. {answer.qid}</QuestionText>
      <AnswerText>{answer.answer}</AnswerText>
    </Container>
  );
};

export default AnswerCard;
