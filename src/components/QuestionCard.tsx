import styled from "styled-components";
import { Answer, AnswersWithQuestion, UserKeeps } from "../model/interfaces";

interface Props {
  answersWithQuestion: AnswersWithQuestion;
  keeps: UserKeeps;
  userProfileComponent: JSX.Element;
  answerCardComponent: (
    answer: Answer,
    keptByUser: boolean,
    userProfileComponent: JSX.Element
  ) => JSX.Element;
}

const QuestionCard: React.FC<Props> = ({
  answersWithQuestion,
  keeps,
  userProfileComponent,
  answerCardComponent,
}) => {
  return (
    <QuestionCardContainer>
      <Question>{answersWithQuestion.question}</Question>
      <Answers>
        {Object.keys(answersWithQuestion.answers).map((aid) =>
          answerCardComponent(
            answersWithQuestion.answers[aid],
            keeps[aid] ? true : false,
            userProfileComponent
          )
        )}
      </Answers>
    </QuestionCardContainer>
  );
};

const Question = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #515fa9;
  white-space: pre-line;
`;
const QuestionCardContainer = styled.li`
  margin-left: 7px;
  &:not(:first-child) {
    margin-top: 30px;
  }
`;
const Answers = styled.ul`
  width: 100%;
`;

export default QuestionCard;
