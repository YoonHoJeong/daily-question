import React from "react";
import styled from "styled-components";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import { Answer } from "../../model/interfaces";
import { UserAnswers } from "./Answers";
import { calcWeek, getAllWeeklyDate, getDay } from "../../services/DateManager";

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

interface DateIconsProps {
  weekDates: any[];
  weekAnswers: any;
}

const DateIcons: React.FC<DateIconsProps> = ({ weekDates, weekAnswers }) => (
  <DateIconsContainer>
    {weekDates.map((date) => (
      <DateIconContainer key={date}>
        <DateIcon
          src={
            Object.keys(weekAnswers).includes(date)
              ? BoxOpenedIcon
              : BoxClosedIcon
          }
        />
      </DateIconContainer>
    ))}
  </DateIconsContainer>
);

interface Props {
  date: Date;
  answers: UserAnswers | undefined;
}

const WeeklyAnswers: React.FC<Props> = ({ date, answers }) => {
  const yearMonthWeek = calcWeek(date);
  const [year, monthStr, week] = yearMonthWeek.replace("W", "-").split("-");
  const month = parseInt(monthStr);
  const weekDates = getAllWeeklyDate(date);
  const weekAnswers = answers && answers[yearMonthWeek];
  const doneCnt = weekAnswers ? Object.keys(weekAnswers).length : 0;

  return (
    <>
      <WeekToggle>
        <Week>
          <YearText>{year}년</YearText>
          {month}월 {week}주차
        </Week>
      </WeekToggle>

      <HelperText>
        5일 중 <AnswerDateCount>{doneCnt}일</AnswerDateCount> 대답했어요.
      </HelperText>
      <DateIcons weekDates={weekDates} weekAnswers={weekAnswers} />
      <Container>
        {weekAnswers ? (
          <DailyAnswersContainer>
            {Object.keys(weekAnswers).map((d) => (
              <>
                <DayText>{getDay(d)}</DayText>
                <AnswerList>
                  {Object.keys(weekAnswers[d]).map((aid) => (
                    <AnswerCard>
                      <KeywordText>
                        {weekAnswers[d][aid].question.keyword}
                      </KeywordText>
                      <QuestionText>
                        Q. {weekAnswers[d][aid].question.question}
                      </QuestionText>
                      <AnswerText>A. {weekAnswers[d][aid].answer}</AnswerText>
                    </AnswerCard>
                  ))}
                </AnswerList>
              </>
            ))}
          </DailyAnswersContainer>
        ) : (
          <>아직 작성을 안 하셨네요.</>
        )}
      </Container>
    </>
  );
};

export default WeeklyAnswers;
