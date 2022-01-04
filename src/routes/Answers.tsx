import React from "react";
import styled from "styled-components";
import AnswerCard from "../components/AnswerCard";
import Button from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Weeks = styled.ul``;
const Week = styled.li``;
const Dates = styled.ul``;
const Date = styled.li``;

const AnswerList = styled.ul``;

const HelperText = styled.p``;
const AnswerDateCount = styled.span``;

interface Props {}

const Answers: React.FC<Props> = () => {
  return (
    <Container>
      <Weeks>
        <Week>2021년 12월 2주차</Week>
        <Week>2021년 12월 3주차</Week>
        <Week>2021년 12월 4주차</Week>
      </Weeks>

      <HelperText>
        5일 중 <AnswerDateCount>1일</AnswerDateCount> 대답했어요.
      </HelperText>
      <Dates>
        <Date>1</Date>
        <Date>2</Date>
        <Date>3</Date>
        <Date>4</Date>
        <Date>5</Date>
      </Dates>

      <AnswerList>
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
      </AnswerList>
    </Container>
  );
};

export default Answers;
