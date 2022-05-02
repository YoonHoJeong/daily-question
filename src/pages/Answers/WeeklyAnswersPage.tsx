import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import DateToggler from '../../components/DateToggler';

import HelperText from '../../components/HelperText';
import { useFetchMyAnswers } from '../../hooks/customUseQueries';
import { datesOfWeek, useDate, weekOfMonth } from '../../hooks/useDate';
import DateCheckIcon from '../../components/DateCheckIcon';
import AnswersHeader from '../../components/answer/AnswersHeader';
import { LoadScreen } from '../../components/common';
import AnswersByDay from '../../components/answer/AnswersByDay';

interface Props {}

const WeeklyAnswersPage: React.FC<Props> = () => {
  const { data } = useFetchMyAnswers();
  const { date: dateMoment, setWeek } = useDate();

  if (!data) {
    return <LoadScreen />;
  }

  const answers = data.getWeeklyAnswers(dateMoment);

  return (
    <>
      <AnswersHeader>
        <DateToggler
          year={dateMoment.year()}
          month={dateMoment.month() + 1}
          weekOfMonth={weekOfMonth(dateMoment)}
          onClickLeft={setWeek(dateMoment.week() - 1)}
          onClickRight={setWeek(dateMoment.week() + 1)}
        />
        <HelperText>
          5일 중 <AnswerDateCount>{answers.dateCnt}일</AnswerDateCount> 대답했어요.
        </HelperText>
      </AnswersHeader>

      <DateIconsContainer>
        {datesOfWeek(dateMoment).map((date) => (
          <DateCheckIcon key={date} checked={answers.hasDate(date)} />
        ))}
      </DateIconsContainer>

      {answers.size > 0 ? (
        <AnswersByDayList>
          {answers.map((date) => (
            <AnswersByDay.Weekly key={date} dateString={date} answers={answers.get(date)} />
          ))}
        </AnswersByDayList>
      ) : (
        <Link to="/">
          <Button bgColor="blue" style={{ fontSize: '12px' }}>
            오늘의 재밌는 질문 대답하러 가기
          </Button>
        </Link>
      )}
    </>
  );
};

const AnswersByDayList = styled.ul`
  & > li:not(:first-child) {
    margin-top: 10px;
  }
`;

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
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
