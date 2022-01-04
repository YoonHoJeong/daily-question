import React from "react";
import styled from "styled-components";

const Container = styled.li``;
const KeywordText = styled.p``;
const QuestionText = styled.p``;
const AnswerText = styled.p``;

interface Props {}

const AnswerCard: React.FC<Props> = () => {
  return (
    <Container>
      <KeywordText>방어기제</KeywordText>
      <QuestionText>
        Q. 상대방의 의견이나 행동에 대해 생각해보지 않고 부정적으로 반응했던
        적이 있나요?
      </QuestionText>
      <AnswerText>네 있습니다. 어쩌구어쩌구어쩌구어쩌구어쩌구</AnswerText>
    </Container>
  );
};

export default AnswerCard;
