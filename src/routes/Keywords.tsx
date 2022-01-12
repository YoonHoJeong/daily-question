import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div``;
const KeywordList = styled.ul``;
const Keyword = styled.li``;

interface Props {}

const Keywords: React.FC<Props> = () => {
  return (
    <Container>
      <Title>키워드를 선택해 주세요.</Title>
      <KeywordList>
        <Keyword>
          <button>방어</button>
        </Keyword>
        <Keyword>
          <button>칼로리</button>
        </Keyword>
        <Keyword>
          <button>밈</button>
        </Keyword>
      </KeywordList>
    </Container>
  );
};

export default Keywords;
