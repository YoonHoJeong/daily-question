import React from "react";
import styled from "styled-components";
import { calcWeek, getAllWeeklyDate } from "../../../services/DateManager";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import { DateQidAnswers } from "../../../model/interfaces";
import LoadScreen from "../../../components/common/LoadScreen";
import WeekToggle from "../WeekToggle";
import WeeklyAnswerCard from "./WeeklyAnswerCard";

import { usePreloadImages } from "../../../hooks/usePreloadImages";
import BoxOpenedIcon from "../../../assets/icons/box_opened.png";
import BoxClosedIcon from "../../../assets/icons/box_closed.png";
import HelperText from "../../../components/HelperText";
import WeeklyAnswerCards from "./WeeklyAnswerCards";

interface Props {
  isLoading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  dateQidAnswers: DateQidAnswers;
  changeWeek: (weekCnt: number) => void;
}

const WeeklyAnswers: React.FC<Props> = ({
  isLoading: dataLoading,
  date,
  dateQidAnswers,
  changeWeek,
}) => {
  const selectedWeekStr = calcWeek(date.dateObj);
  const weekAnswers = Object.keys(dateQidAnswers)
    .filter((date) => calcWeek(new Date(date)) === selectedWeekStr)
    .reduce((obj, date) => ({ ...obj, [date]: dateQidAnswers[date] }), {});

  const [year, month, week] = selectedWeekStr.replace("W", "-").split("-");
  const weekDates = getAllWeeklyDate(date.dateObj);
  const totalWeekAnswerCnt = Object.keys(weekAnswers).reduce(
    (weekAcc, date) => {
      const dateCnt = Object.keys(weekAnswers[date]).reduce(
        (dateAcc, qid) =>
          dateAcc + Object.keys(weekAnswers[date][qid].answers).length,
        0
      );
      return weekAcc + dateCnt;
    },
    0
  );
  const answeredDateCnt = Object.keys(weekAnswers).length;

  const { loading: imageLoading } = usePreloadImages([
    BoxOpenedIcon,
    BoxClosedIcon,
  ]);

  const loading = dataLoading || imageLoading;
  if (loading) {
    return <LoadScreen />;
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
          {totalWeekAnswerCnt > 0 ? (
            <>
              5일 중 <AnswerDateCount>{answeredDateCnt}일</AnswerDateCount>{" "}
              대답했어요.
            </>
          ) : (
            <>이번 주에는 아직 답변이 없네요...</>
          )}
        </HelperText>
        <DateIcons weekDates={weekDates} weekAnswers={weekAnswers} />
        <WeeklyAnswerCards weekAnswers={weekAnswers} />
        {totalWeekAnswerCnt > 0 ? null : (
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

export default WeeklyAnswers;
