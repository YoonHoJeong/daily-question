import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";

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
  const history = useHistory();
  const moveToMain = () => {
    history.push("/");
  };
  const moveToAnswers = () => {
    history.push("/answers");
  };

  return (
    <Container>
      <MainText>내일의 질문도 기대해주세요.</MainText>
      <Button
        bgColor="blue"
        style={{ marginBottom: "9px" }}
        onClick={moveToMain}
      >
        다른 질문도 보러가기
      </Button>
      <Button onClick={moveToAnswers}>어제의 답변 돌아보기</Button>
    </Container>
  );
};

export default SubmitDone;
