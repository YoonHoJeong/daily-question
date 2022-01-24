import React from "react";
import styled from "styled-components";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import { Answer } from "../../model/interfaces";

export const YearText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  margin-bottom: 12px;
`;
export const HelperText = styled.p`
  margin-top: 14px;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

export const WeekToggle = styled.ul`
  position: relative;

  margin-top: 30px;
`;
export const Week = styled.li`
  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;
export const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;
const DateIconContainer = styled.li``;
const DateIcon = styled.img`
  height: 40px;
`;
const DateIconsContainer = styled.ul`
  width: 300px;

  display: flex;
  justify-content: space-around;

  margin-top: 18px;
`;

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

const DateIcons: React.FC = () => (
  <DateIconsContainer>
    <DateIconContainer>
      <DateIcon src={BoxOpenedIcon} />
    </DateIconContainer>
    <DateIconContainer>
      <DateIcon src={BoxOpenedIcon} />
    </DateIconContainer>
    <DateIconContainer>
      <DateIcon src={BoxOpenedIcon} />
    </DateIconContainer>
    <DateIconContainer>
      <DateIcon src={BoxClosedIcon} />
    </DateIconContainer>
    <DateIconContainer>
      <DateIcon src={BoxOpenedIcon} />
    </DateIconContainer>
  </DateIconsContainer>
);

interface Props {
  answers: any[];
}

const WeeklyAnswers: React.FC<Props> = () => {
  return (
    <>
      <WeekToggle>
        {/* {Object.keys(answers).map((week) => {
    const weekArr = week.replace("W", "-").split("-");
    return (
      <Week>{`${weekArr[0]}년 ${weekArr[1]}월 ${weekArr[2]}주차`}</Week>
    );
  })} */}
        <Week>
          <YearText>2022년</YearText>
          1월 3주차
        </Week>
        <Week>
          <YearText>2022년</YearText>
          1월 3주차
        </Week>
        <Week>
          <YearText>2022년</YearText>
          1월 3주차
        </Week>
      </WeekToggle>

      <HelperText>
        5일 중 <AnswerDateCount>3일</AnswerDateCount> 대답했어요.
      </HelperText>
      <DateIcons />
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
                A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는
                과자는 제일 좋아하는 과자는
              </AnswerText>
            </AnswerCard>
            <AnswerCard>
              <KeywordText>과자</KeywordText>
              <QuestionText>
                Q. {"당신이 제일 좋아하는 과자는 무엇인가요?"}
              </QuestionText>
              <AnswerText>
                A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는
                과자는 제일 좋아하는 과자는
              </AnswerText>
            </AnswerCard>
            <AnswerCard>
              <KeywordText>과자</KeywordText>
              <QuestionText>
                Q. {"당신이 제일 좋아하는 과자는 무엇인가요?"}
              </QuestionText>
              <AnswerText>
                A. 제일 좋아하는 과자는 제일 좋아하는 과자는 제일 좋아하는
                과자는 제일 좋아하는 과자는
              </AnswerText>
            </AnswerCard>
          </AnswerList>
        </DailyAnswersContainer>
      </Container>
    </>
  );
};

export default WeeklyAnswers;
