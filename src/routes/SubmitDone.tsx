import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MainText = styled.p``;

interface Props {}

const SubmitDone: React.FC<Props> = () => {
  return (
    <Container>
      <MainText>답변이 제출되었습니다.</MainText>
    </Container>
  );
};

export default SubmitDone;
