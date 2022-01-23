import React from "react";
import styled from "styled-components";

const AnswerCard = styled.li`
  padding: 14px 16px;
  margin-top: 4px;

  border: 1px solid ${(props) => props.theme.palette.grey};
  border-radius: 10px;

  line-height: 19px;
  /* identical to box height */

  color: #515fa9;
  &:first-child {
    width: 300px;
    background-color: ${(props) => props.theme.palette.white};
  }
  &:nth-child(2) {
    width: 280px;
    background-color: ${(props) => props.theme.palette.bgGrey};
  }
  &:nth-child(3) {
    width: 260px;
    background-color: ${(props) => props.theme.palette.bgGrey2};
  }
`;
const Container = styled.ul``;
const DailyAnswersContainer = styled.li`
  margin-top: 30px;
`;
const DayText = styled.p`
  font-weight: 500;

  margin-left: 10px;
`;

const AnswerList = styled.ul`
  position: relative;

  flex-direction: column;
  display: flex;
  align-items: center;
`;
const KeywordText = styled.p`
  font-size: 11px;
  color: ${(props) => props.theme.palette.deepGrey};
`;
const QuestionText = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.palette.blue};
`;
const AnswerText = styled.p`
  font-size: 11px;
  margin-top: 5px;
  margin-left: 5px;
`;

interface Props {}

const DailyAnswersList: React.FC<Props> = () => {
  return (
    <Container>
      <DailyAnswersContainer>
        <DayText>화요일</DayText>
        <AnswerList>
          <AnswerCard>
            <KeywordText>과자</KeywordText>
            <QuestionText>
              Q. {"당신이 제일 좋아하는 과자는 무엇인가요?"}
            </QuestionText>
            <AnswerText>
              A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는
              제일 좋아하는 과자는
            </AnswerText>
          </AnswerCard>
          <AnswerCard>
            <KeywordText>과자</KeywordText>
            <QuestionText>
              Q. {"당신이 제일 좋아하는 과자는 무엇인가요?"}
            </QuestionText>
            <AnswerText>
              A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는
              제일 좋아하는 과자는
            </AnswerText>
          </AnswerCard>
          <AnswerCard>
            <KeywordText>과자</KeywordText>
            <QuestionText>
              Q. {"당신이 제일 좋아하는 과자는 무엇인가요?"}
            </QuestionText>
            <AnswerText>
              A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는 과자는
              제일 좋아하는 과자는
            </AnswerText>
          </AnswerCard>
        </AnswerList>
      </DailyAnswersContainer>
    </Container>
  );
};

export default DailyAnswersList;
