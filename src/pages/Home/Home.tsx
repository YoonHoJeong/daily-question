import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { useFetchQuestions } from "../hooks/customUseQueries";

interface Props {}

const Home: React.FC<Props> = () => {
  const { data: questions, isLoading, isError } = useFetchQuestions();

  if (isError) return <>error</>;

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {questions ? (
            <>
              <Title>키워드를 선택해주세요.</Title>
              <KeywordList>
                {Object.keys(questions).map((qid) => (
                  <Keyword key={qid}>
                    <Link to={`/question/${qid}`}>
                      <Button
                        small
                        style={{ fontSize: "18px", fontWeight: 500 }}
                      >
                        {questions[qid].keyword}
                      </Button>
                    </Link>
                  </Keyword>
                ))}
              </KeywordList>
            </>
          ) : (
            <Title>오늘은 질문이 없어요.</Title>
          )}
        </>
      )}
    </Container>
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
`;

export default Home;
