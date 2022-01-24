import { CircularProgress } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useFireDBFetch } from "../../hooks/useFireDBFetch";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DailyAnswersList from "./DailyAnswersList";

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeekToggle = styled.ul`
  position: relative;

  margin-top: 30px;
`;
const Week = styled.li`
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
const YearText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  margin-bottom: 12px;
`;
const HelperText = styled.p`
  margin-top: 14px;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

const DateIconsContainer = styled.ul`
  width: 300px;

  display: flex;
  justify-content: space-around;

  margin-top: 18px;
`;
const FilledDateIcon = styled.li``;
const DateIconContainer = styled.li``;
const DateIcon = styled.img`
  height: 40px;
`;
const DateFormatPicker = styled.ul`
  position: absolute;
  top: 12px;
  right: 48px;
`;
const DateFormat = styled.li`
  width: 44px;
  height: 26px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-color: ${(props) => props.theme.palette.white};
  &:not(:first-child) {
    display: none;

    background-color: ${(props) => props.theme.palette.bgGrey2};
    margin-top: 2px;
  }
`;

const DateFormatIcon = styled.button`
  position: absolute;
  top: 0px;
  right: -30px;

  padding: 0;

  border: none;
  background-color: transparent;
`;

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;

type ViewFormat = "weekly" | "daily" | "monthly";

interface DateFormatterProps {
  viewFormat: ViewFormat;
  setViewFormat: React.Dispatch<React.SetStateAction<ViewFormat>>;
}

const DateFormatter: React.FC<DateFormatterProps> = ({
  viewFormat,
  setViewFormat,
}) => {
  const [folded, setFolded] = useState<boolean>(true);

  const onClick = (e: SyntheticEvent) => {
    setFolded((currentState) => !currentState);
  };
  const onClickViewFormat = (e: SyntheticEvent) => {
    const vf = (e.target as HTMLButtonElement).name as ViewFormat;
    setViewFormat(vf);
    setFolded(true);
  };

  const viewFormats = { weekly: "주간", daily: "일간", monthly: "월간" };

  return (
    <DateFormatPicker>
      <DateFormat key={viewFormat}>{viewFormats[viewFormat]}</DateFormat>
      {Object.keys(viewFormats)
        .filter((key) => key !== viewFormat)
        .map((vf) => (
          <DateFormat key={vf} style={{ display: folded ? "none" : "flex" }}>
            <button name={vf} onClick={onClickViewFormat}>
              {viewFormats[vf]}
            </button>
          </DateFormat>
        ))}

      <DateFormatIcon onClick={onClick}>
        {folded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </DateFormatIcon>
    </DateFormatPicker>
  );
};

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

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  // const {
  //   data: answers,
  //   loading,
  //   error,
  // } = useFireDBFetch<any>(`user-answers/${uid}`);
  const [selectedWeek, setSelectedWeek] = useState<string | undefined>();
  const [viewFormat, setViewFormat] = useState<ViewFormat>("weekly");

  // useEffect(() => {
  //   setSelectedWeek(Object.keys(answers).pop());
  // }, [answers]);

  // if (loading) {
  //   return <>loading...</>;
  // }

  return (
    <Container>
      <DateFormatter viewFormat={viewFormat} setViewFormat={setViewFormat} />
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

      <DailyAnswersList />
    </Container>
  );
};

export default Answers;
