import React from "react";
import styled from "styled-components";
import BoxOpenedIcon from "../../assets/box_opened.png";
import BoxClosedIcon from "../../assets/box_closed.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { calcWeek, getAllWeeklyDate, getDay } from "../../services/DateManager";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import { UserAnswers } from "../../model/interfaces";
import Loader from "../../components/common/Loader";

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
  date: {
    dateObj: Date;
    year: number;
    month: number;
  };
  answers: UserAnswers | undefined;
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
  const [year, monthStr, week] = yearMonthWeek.replace("W", "-").split("-");
  const month = parseInt(monthStr);
  const weekDates = getAllWeeklyDate(date.dateObj);
  const weekAnswers = (answers && answers[yearMonthWeek]) || {};
  const doneCnt = weekAnswers ? Object.keys(weekAnswers).length : 0;
  const { loading: imageLoading } = usePreloadImages([
    BoxOpenedIcon,
    BoxClosedIcon,
  ]);

  const loading = dataLoading || imageLoading;

  return (
    <Container>
      <WeekToggle>
        <WeekToggleButton onClick={() => changeWeek(-1)}>
          <KeyboardArrowLeftIcon />
        </WeekToggleButton>
        <Week>
          <YearText>{year}년</YearText>
          {month}월 {week}주차
        </Week>
        <WeekToggleButton right onClick={() => changeWeek(1)}>
          <KeyboardArrowRightIcon />
        </WeekToggleButton>
      </WeekToggle>

      {loading ? (
        <Loader />
      ) : (
        <>
          {doneCnt > 0 ? (
            <HelperText>
              5일 중 <AnswerDateCount>{doneCnt}일</AnswerDateCount> 대답했어요.
            </HelperText>
          ) : (
            <HelperText>이번 주에는 아직 답변이 없네요...</HelperText>
          )}
          <DateIcons weekDates={weekDates} weekAnswers={weekAnswers} />
          <AnswersContainer>
            {doneCnt > 0 ? (
              <DailyAnswersContainer>
                {Object.keys(weekAnswers).map((d) => (
                  <DailyAnswers key={d}>
                    <DayText>{getDay(d)}</DayText>
                    <AnswerList>
                      {Object.keys(weekAnswers[d]).map((aid) => (
                        <AnswerCard key={aid}>
                          <KeywordText>
                            {weekAnswers[d][aid].question.keyword}
                          </KeywordText>
                          <QuestionText>
                            Q.
                            <span>{weekAnswers[d][aid].question.question}</span>
                          </QuestionText>
                          <AnswerText>
                            A.
                            <p>{weekAnswers[d][aid].answer}</p>
                          </AnswerText>
                        </AnswerCard>
                      ))}
                    </AnswerList>
                  </DailyAnswers>
                ))}
              </DailyAnswersContainer>
            ) : (
              <Link to="/">
                <Button bgColor="blue" style={{ fontSize: "12px" }}>
                  오늘의 재밌는 질문 대답하러 가기
                </Button>
              </Link>
            )}
          </AnswersContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-bottom: 100px;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
export const WeekToggleButton = styled.button<{ right?: boolean }>`
  position: absolute;
  bottom: -4px;
  ${(props) => (props.right ? "right: -35px" : "left: -35px")};
`;
export const Week = styled.li`
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
  max-width: 45px;
  height: 35px;
`;
const DateIconsContainer = styled.ul`
  width: 300px;

  display: flex;
  justify-content: space-around;

  margin-top: 18px;
`;

const AnswerCard = styled.li`
  padding: 10px 16px;
  padding-bottom: 19px;
  margin-top: 4px;

  border: 1px solid ${(props) => props.theme.palette.grey};
  border-radius: 10px;

  line-height: 19px;
  /* identical to box height */

  width: 300px;
  background-color: ${(props) => props.theme.palette.white};
`;
const AnswersContainer = styled.ul`
  margin-top: 30px;
`;
const DailyAnswersContainer = styled.li``;

const DailyAnswers = styled.div`
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
`;
const KeywordText = styled.p`
  font-size: 11px;
  color: ${(props) => props.theme.palette.deepGrey};
`;
const QuestionText = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  color: ${(props) => props.theme.palette.blue};
  display: flex;
`;
const AnswerText = styled.div`
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
`;

export default WeeklyAnswers;
