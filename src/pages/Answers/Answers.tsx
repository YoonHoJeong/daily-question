import React, { useMemo, useState } from "react";
import { Route } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "../../hooks/useAuth";

import { LoadScreen } from "../../components/common";
import DailyAnswers from "./DailyAnswers";
import MonthlyAnswers from "./MonthlyAnswers";
import WeeklyAnswers from "./Weekly/WeeklyAnswers";
import DateFormatPicker from "./DateFormatPicker";
import { useFetchUserAnswers } from "../../hooks/customUseQueries";
import { BoxOpenedIcon, BoxClosedIcon } from "../../assets/icons";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import { AnswersWrapper } from "../../services/AnswerApi";
import { CustomDate } from "../../services/CustomDate";

interface Props {}

const Answers: React.FC<Props> = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useFetchUserAnswers(user!!.uid);
  const answers = new AnswersWrapper(data);

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

  if (isError) {
    return <>Error Page</>;
  }
  if (isLoading || imageLoading) {
    return <LoadScreen />;
  }

  return (
    <Container>
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
      <Route exact path="/answers">
        <WeeklyAnswers
          date={selectedDate}
          answers={answers}
          changeWeek={changeWeek}
        />
      </Route>
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
