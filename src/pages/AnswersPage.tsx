import React, { useState } from "react";
import { Route } from "react-router-dom";

import styled from "styled-components";

import { useAuth } from "../hooks/useAuth";

import { LoadScreen } from "../components/common";
import DailyAnswers from "./Answers/DailyAnswers";
import MonthlyAnswers from "./Answers/MonthlyAnswers";
import WeeklyAnswers from "./Answers/Weekly/WeeklyAnswers";
import DateFormatPicker from "../components/DateFormatPicker";
import { useFetchUserAnswers } from "../hooks/customUseQueries";
import { BoxOpenedIcon, BoxClosedIcon } from "../assets/icons";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { CustomDate } from "../services/CustomDate";

interface Props {}

const AnswersPage: React.FC<Props> = () => {
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

  return <Container></Container>;
};

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default AnswersPage;
