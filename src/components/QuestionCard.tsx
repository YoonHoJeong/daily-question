import styled from "styled-components";
import {
  Answer,
  AnswersWithQuestion,
  FetchedAnswers,
  UserKeeps,
} from "../model/interfaces";

interface Props {
  answers: Answer[];
  profileOn: boolean;
  // keeps: UserKeeps;
  answerCardComponent: (
    answer: Answer,
    profileOn: boolean
    // keptByUser: boolean,
  ) => JSX.Element;
}

const QuestionCard: React.FC<Props> = ({
  answers,
  answerCardComponent,
  profileOn,
  // keeps,
}) => {
  const question = answers[0].question;

  return (
    <QuestionCardContainer>
      <QuestionText>{question.question}</QuestionText>
      <Answers>
        {answers.map((answer) =>
          answerCardComponent(
            answer,
            profileOn
            // keeps[aid] ? true : false,
          )
        )}
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
