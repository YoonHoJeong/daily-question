import React from "react";
import styled from "styled-components";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import { calcWeek, getAllWeeklyDate, getDay } from "../../services/DateManager";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import { Answer, FetchedAnswers, Question } from "../../model/interfaces";
import Loader from "../../components/common/Loader";
import WeekToggle from "./WeekToggle";
import WeeklyAnswerCard from "./WeeklyAnswerCard";
import { formatAnswersToDateQidAnswers } from "../../services/utils";

interface Props {
  isLoading: boolean;
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: FetchedAnswers;
  changeWeek: (weekCnt: number) => void;
}

const WeeklyAnswers: React.FC<Props> = ({
  isLoading: dataLoading,
  date,
  answers,
  changeWeek,
}) => {
  const dateQidAnswers = formatAnswersToDateQidAnswers(answers);
  const selectedWeekStr = calcWeek(date.dateObj);
  const weekAnswers = Object.keys(dateQidAnswers)
    .filter((date) => calcWeek(new Date(date)) === selectedWeekStr)
    .reduce((obj, date) => ({ ...obj, [date]: dateQidAnswers[date] }), {});
  console.log(weekAnswers);

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
        {totalWeekAnswerCnt > 0 ? (
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

interface DailyAnswersProps {
  answers: {
    [qid: string]: {
      question: Question;
      answers: { [aid: string]: Answer };
    };
  };
  date: string;
}
const DailyAnswers: React.FC<DailyAnswersProps> = ({ answers, date }) => {
  console.log(answers);

  return (
    <DailyAnswersContainer>
      <DayText>{getDay(date)}</DayText>
      <AnswerList>
        {Object.keys(answers).map((qid) => (
          <WeeklyAnswerCard key={qid} answers={answers[qid].answers} />
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
