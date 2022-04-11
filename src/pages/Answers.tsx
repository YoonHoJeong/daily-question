import React, { useState } from "react";
import { Route } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "../hooks/useAuth";

import { LoadScreen } from "../components/common";
import DailyAnswers from "./Answers/DailyAnswers";
import MonthlyAnswers from "./Answers/MonthlyAnswers";
import WeeklyAnswers from "./Answers/Weekly/WeeklyAnswers";
import DateFormatPicker from "./Answers/DateFormatPicker";
import { useFetchUserAnswers } from "../hooks/customUseQueries";
import { BoxOpenedIcon, BoxClosedIcon } from "../assets/icons";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { CustomDate } from "../services/CustomDate";

interface Props {}

const Answers: React.FC<Props> = () => {
  const { user } = useAuth();

  const { data: answers, isLoading } = useFetchUserAnswers(user!!.uid);

  const [selectedDate, setSelectedDate] = useState<CustomDate>(
    new CustomDate(new Date())
  );
  const changeWeek = (weekCount: number) => {
    setSelectedDate(selectedDate.changeWeek(weekCount));
  };
  const changeMonth = (monthCount: number) => {
    setSelectedDate(selectedDate.changeMonth(monthCount));
  };

  const { loading: imageLoading } = usePreloadImages([
    BoxOpenedIcon,
    BoxClosedIcon,
  ]);

  if (isLoading || imageLoading) {
    return <LoadScreen />;
  }

  return (
    <Container>
      {answers ? (
        <>
          <DateFormatPicker />
          <Route path="/answers/monthly">
            <MonthlyAnswers
              date={selectedDate}
              answers={answers}
              changeMonth={changeMonth}
            />
          </Route>
          <Route path="/answers/daily">
            <DailyAnswers answers={answers} />
          </Route>
          <Route path="/answers/weekly">
            <WeeklyAnswers
              date={selectedDate}
              answers={answers}
              changeWeek={changeWeek}
            />
          </Route>
          <Route path="/answers">
            <WeeklyAnswers
              date={selectedDate}
              answers={answers}
              changeWeek={changeWeek}
            />
          </Route>
        </>
      ) : (
        <>답변한 질문이 없어요.</>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Answers;
