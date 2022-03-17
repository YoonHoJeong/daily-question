import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, LoadScreen } from "../../components/common";
import { useFetchQuestions } from "../../hooks/customUseQueries";
import {
  QuestionsDataModel,
  QuestionDataModel,
} from "../../model/QuestionModels";

interface Props {}

const Home: React.FC<Props> = () => {
  const { data: questions, isLoading, isError } = useFetchQuestions();

  if (isError) {
    throw new Error();
  }

  return (
    <Container>
      {isLoading ? (
        <LoadScreen />
      ) : questions ? (
        <KeywordsScreen questions={questions} />
      ) : (
        <Title>오늘은 질문이 없어요.</Title>
      )}
    </Container>
  );
};

interface KeywordsSreenProps {
  questions: QuestionsDataModel;
}

const KeywordsScreen: React.FC<KeywordsSreenProps> = ({ questions }) => {
  return (
    <>
      <Title>키워드를 선택해주세요.</Title>
      <KeywordList>
        {Object.keys(questions).map((qid) => (
          <KeywordLink key={qid} question={questions[qid]} />
        ))}
      </KeywordList>
    </>
  );
};

const KeywordLink: React.FC<{ question: QuestionDataModel }> = ({
  question,
}) => {
  return (
    <Keyword>
      <Link to={`/question/${question.qid}`}>
        <Button small style={{ fontSize: "18px", fontWeight: 500 }}>
          {question.keyword}
        </Button>
      </Link>
    </Keyword>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 18px;

  margin-bottom: 15px;
`;
const KeywordList = styled.ul``;
const Keyword = styled.li`
  font-size: 18px;
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export default Home;
