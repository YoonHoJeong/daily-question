import React from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import WeekToggle from "./WeekToggle";

import { BoxClosedIcon, BoxOpenedIcon } from "../../assets/icons";
import HelperText from "../../components/HelperText";
import WeeklyAnswerCards from "./Weekly/WeeklyAnswerCards";
import { DateQidAnswersDataModel } from "../../models/AnswerModels";
import { AnswersWrapper } from "../../services/AnswerApi";
import { CustomDate } from "../../services/CustomDate";
import { BottomNavigation, Header } from "../../components/layouts";
import { ClientLayout } from "../../components/layouts/ClientLayout";

interface Props {
  // date: CustomDate;
  // answers: AnswersWrapper;
  // changeWeek: (weekCount: number) => void;
}

const WeeklyAnswersPage: React.FC<Props> = () => {
  // const weekAnswers = answers.getDateQidAnswers().filteredByWeek(date);
  // const weekDates = date.getAllWeeklyDates();
  // const totalWeekAnswerCnt = weekAnswers.answerCount;
  // const answeredDateCnt = weekAnswers.answeredDateCount;

  return (
    <>
      WeeklyAnswers
      {/* <>
        <WeekToggle
          toggleType="week"
          date={date}
          changeWeekOrMonth={changeWeek}
        />
        <HelperText>
          {totalWeekAnswerCnt > 0 ? (
            <>
              5일 중 <AnswerDateCount>{answeredDateCnt}일</AnswerDateCount>{" "}
              대답했어요.
            </>
          ) : (
            <>이번 주에는 아직 답변이 없네요...</>
          )}
        </HelperText>
        <DateIcons weekDates={weekDates} weekAnswers={weekAnswers.data} />
        <WeeklyAnswerCards weekAnswers={weekAnswers.data} />
        {totalWeekAnswerCnt > 0 ? null : (
          <Link to="/">
            <Button bgColor="blue" style={{ fontSize: "12px" }}>
              오늘의 재밌는 질문 대답하러 가기
            </Button>
          </Link>
        )}
      </> */}
    </>
  );
};

interface DateIconsProps {
  weekDates: string[];
  weekAnswers: DateQidAnswersDataModel;
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

const Container = styled.div`
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  padding: 24px 0px;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;
const DateIconContainer = styled.li``;
const DateIcon = styled.img`
  max-width: 46px;
  height: 46px;
`;
const DateIconsContainer = styled.ul`
  width: 300px;

  display: flex;
  justify-content: center;

  margin-top: 18px;
  margin-bottom: 20px;

  & > li:not(:first-child) {
    margin-left: 12px;
  }
`;

export default WeeklyAnswersPage;
