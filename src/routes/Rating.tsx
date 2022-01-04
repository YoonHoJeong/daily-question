import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MainText = styled.p``;
const RatingContainer = styled.ul``;
const RatingComment = styled.textarea``;
const RateIcon = styled.div``;

interface Props {}

const Rating: React.FC<Props> = () => {
  return (
    <Container>
      <MainText>오늘의 질문은 어떠셨나요?</MainText>
      <RatingContainer>
        <RateIcon>☆</RateIcon>
        <RateIcon>☆</RateIcon>
        <RateIcon>☆</RateIcon>
        <RateIcon>☆</RateIcon>
        <RateIcon>☆</RateIcon>
      </RatingContainer>
      <RatingComment placeholder="소감을 작성해주세요." />
      <Button variant="contained">소감 제출하기</Button>
    </Container>
  );
};

export default Rating;
