import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import DateToggler from '../../components/DateToggler';

import HelperText from '../../components/HelperText';
import AnswerCardsContainer from '../../components/answer/AnswerCardsContainer';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { datesOfWeek, useMoment, weekOfMonth } from '../../hooks/useMoment';
import DateCheckIcon from '../../components/DateCheckIcon';

interface Props {
  // date: CustomDate;
  // changeWeek: (weekCount: number) => void;
}

const WeeklyAnswersPage: React.FC<Props> = () => {
  const { data: answers } = useMyAnswers();
  const { date: dateMoment, setWeek } = useMoment();
  const weeklyAnswers = answers?.getWeeklyAnswers(dateMoment);

  return (
    <>
      <DateToggler
        year={dateMoment.year()}
        month={dateMoment.month() + 1}
        weekOfMonth={weekOfMonth(dateMoment)}
        onClickLeft={setWeek(dateMoment.week() - 1)}
        onClickRight={setWeek(dateMoment.week() + 1)}
      />
      <HelperText>
        5일 중 <AnswerDateCount>{weeklyAnswers && weeklyAnswers.dateCnt}일</AnswerDateCount> 대답했어요.
      </HelperText>
      <DateIconsContainer>
        {datesOfWeek(dateMoment).map((date) => (
          <DateCheckIcon key={date} checked={Object.keys(weeklyAnswers?.data ?? {}).includes(date)} />
        ))}
      </DateIconsContainer>

      {weeklyAnswers ? (
        <AnswerCardsContainer answers={weeklyAnswers.data} />
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
