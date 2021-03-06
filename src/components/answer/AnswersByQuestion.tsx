import styled from 'styled-components';
import { AnswerData } from '../../models/AnswerModels';
import { QuestionDataModel } from '../../models/QuestionModels';
import AnswerCard from './AnswerCard';

interface Props {
  question: QuestionDataModel;
  answers: {
    [aid: string]: AnswerData;
  };
  profileOn: boolean;
}

const AnswersByQuestion: React.FC<Props> = ({
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
          <AnswerCard.NoBorder key={aid} answer={answers[aid]} profileOn={profileOn} />
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
export const QuestionCardContainer = styled.li``;
const Answers = styled.ul`
  width: 100%;

  & > li:not(:first-child) {
    margin-top: 15px;
  }
`;

export default AnswersByQuestion;
