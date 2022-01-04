import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {}

const Menu: React.FC<Props> = () => {
  return (
    <Container>
      <Button variant="contained">오늘의 질문</Button>
      <Button variant="outlined">내 답변 목록</Button>
    </Container>
  );
};

export default Menu;
