import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useInternalRouter } from "../routes/useInternalRouter";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainText = styled.p`
  color: #4d4d4d;
  margin-bottom: 25px;
  white-space: pre;
`;

interface Props {}

const SubmitDone: React.FC<Props> = () => {
  const { push } = useInternalRouter();
  const moveToMain = () => {
    push("/");
  };
  const moveToAnswers = () => {
    push("/answers");
  };

  return (
    <Container>
      <MainText>내일의 질문도 기대해주세요.</MainText>
      <Button
        bgColor="blue"
        style={{ marginBottom: "9px", fontWeight: 500 }}
        onClick={moveToMain}
      >
        다른 질문도 보러가기
      </Button>
      <Button onClick={moveToAnswers} style={{ fontWeight: 500 }}>
        어제의 답변 돌아보기
      </Button>
    </Container>
  );
};

export default SubmitDone;
