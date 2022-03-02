import React from "react";
import styled from "styled-components";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import { calcWeek, getAllWeeklyDate, getDay } from "../../services/DateManager";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import { AnswerWithQuestion, WeekDateAnswers } from "../../model/interfaces";
import Loader from "../../components/common/Loader";
import WeekToggle from "./WeekToggle";
import WeeklyAnswerCard from "./WeeklyAnswerCard";

interface Props {
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: WeekDateAnswers | undefined;
  changeWeek: (weekCnt: number) => void;
  loading: boolean;
}

const WeeklyAnswers: React.FC<Props> = ({
  date,
  answers,
  changeWeek,
  loading: dataLoading,
}) => {
  const yearMonthWeek = calcWeek(date.dateObj);
  const [year, month, week] = yearMonthWeek.replace("W", "-").split("-");
  const weekDates = getAllWeeklyDate(date.dateObj);
  const weekAnswers = (answers && answers[yearMonthWeek]) || {};
  const doneCnt = weekAnswers ? Object.keys(weekAnswers).length : 0;
  const { loading: imageLoading } = usePreloadImages([
    BoxOpenedIcon,
    BoxClosedIcon,
  ]);

  const loading = dataLoading || imageLoading;
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <>
        <WeekToggle
          date={{
            year: parseInt(year),
            month: parseInt(month),
            week: parseInt(week),
          }}
          changeWeekOrMonth={changeWeek}
        />
        <HelperText>
          {doneCnt > 0 ? (
            <>
              5일 중 <AnswerDateCount>{doneCnt}일</AnswerDateCount> 대답했어요.
            </>
          ) : (
            <>이번 주에는 아직 답변이 없네요...</>
          )}
        </HelperText>
        <DateIcons weekDates={weekDates} weekAnswers={weekAnswers} />
        {doneCnt > 0 ? (
          <DailyAnswersList>
            {Object.keys(weekAnswers).map((date) => (
              <DailyAnswers
                key={date}
                date={date}
                answers={weekAnswers[date]}
              />
            ))}
          </DailyAnswersList>
        ) : (
          <Link to="/">
            <Button bgColor="blue" style={{ fontSize: "12px" }}>
              오늘의 재밌는 질문 대답하러 가기
            </Button>
          </Link>
        )}
      </>
    </Container>
  );
};

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

const DailyAnswers: React.FC<{
  answers: { [aid: string]: AnswerWithQuestion };
  date: string;
}> = ({ answers, date }) => {
  return (
    <DailyAnswersContainer>
      <DayText>{getDay(date)}</DayText>
      <AnswerList>
        {Object.keys(answers).map((aid) => (
          <WeeklyAnswerCard key={aid} answer={answers[aid]} />
        ))}
      </AnswerList>
    </DailyAnswersContainer>
  );
};

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

export const HelperText = styled.p`
  margin-top: 14px;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

export const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;
const DateIconContainer = styled.li``;
const DateIcon = styled.img`
  max-width: 45px;
  height: 35px;
`;
const DateIconsContainer = styled.ul`
  width: 300px;

  display: flex;
  justify-content: space-around;

  margin-top: 18px;
  margin-bottom: 30px;
`;

const DailyAnswersList = styled.ul``;

const DailyAnswersContainer = styled.li`
  margin-top: 10px;
`;
const DayText = styled.p`
  font-weight: 500;

  margin-left: 10px;
  margin-bottom: 5px;
`;

const AnswerList = styled.ul`
  position: relative;

  flex-direction: column;
  display: flex;
  align-items: center;

  & > li:not(:first-child) {
    margin-top: 10px;
  }
`;

export default WeeklyAnswers;
