import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const QuestionText = styled.p``;

const AnswerInput = styled.textarea``;

interface Props {}

const Question: React.FC<Props> = () => {
  return (
    <Container>
      <QuestionText>
        상대방의 의견이나 행동에 대해 부정적으로 반응했던 적이 있나요?
      </QuestionText>
      <AnswerInput placeholder="답변"></AnswerInput>
      <Button variant="contained">답변 제출하기</Button>
    </Container>
  );
};

export default Question;
