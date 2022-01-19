import React from "react";
import styled from "styled-components";
import { Question } from "../model/interfaces";

interface Props {
  question: Question;
}

const QuestionContainer = styled.li``;
const QuestionText = styled.p``;
const Keyword = styled.span``;

const QuestionItem: React.FC<Props> = ({ question }) => {
  return (
    <QuestionContainer>
      <Keyword>{question.keyword}</Keyword>
      <QuestionText>{question.question}</QuestionText>
    </QuestionContainer>
  );
};

export default QuestionItem;
