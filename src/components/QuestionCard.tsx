import styled from "styled-components";
import { AnswerType, QuestionType } from "../model/interfaces";
import AnswerCard from "./AnswerCard";

interface Props {
  question: QuestionType;
  answers: {
    [aid: string]: AnswerType;
  };
  profileOn: boolean;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  profileOn,
  // keeps,
}) => {
  return (
    <QuestionCardContainer>
      <QuestionText>{question.question}</QuestionText>
      <Answers>
        {Object.keys(answers).map((aid) => (
          <AnswerCard key={aid} answer={answers[aid]} profileOn={profileOn} />
        ))}
      </Answers>
    </QuestionCardContainer>
  );
};

const QuestionText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #515fa9;
  white-space: pre-line;

  margin-bottom: 10px;
`;
const QuestionCardContainer = styled.li``;
const Answers = styled.ul`
  width: 100%;

  & > li:not(:first-child) {
    margin-top: 15px;
  }
`;

export default QuestionCard;
