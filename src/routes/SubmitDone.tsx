import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MainText = styled.p``;
const ButtonContainer = styled.div``;

interface Props {}

const SubmitDone: React.FC<Props> = () => {
  return (
    <Container>
      <MainText>내일도 기대해주세요.</MainText>
      <ButtonContainer>
        <Button>다른 질문 확인하기</Button>
        <Button>내 답변 목록</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SubmitDone;
