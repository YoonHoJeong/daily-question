import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import DateToggler from '../../components/DateToggler';

import HelperText from '../../components/HelperText';
import AnswerCardsContainer from '../../components/answer/AnswerCardsContainer';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { useMoment } from '../../hooks/useMoment';
import DateCheckIcon from '../../components/DateCheckIcon';

interface Props {
  // date: CustomDate;
  // changeWeek: (weekCount: number) => void;
}

const WeeklyAnswersPage: React.FC<Props> = () => {
  const { data: answers } = useMyAnswers();
  const moment = useMoment('2022-03-03');
  const weeklyAnswers = answers?.getWeeklyAnswers(moment);

  return (
    <>
      <DateToggler
        year={moment.year}
        month={moment.month + 1}
        weekOfMonth={moment.weekOfMonth}
        onClickLeft={moment.setWeek(moment.week - 1)}
        onClickRight={moment.setWeek(moment.week + 1)}
      />
      <HelperText>
        5일 중 <AnswerDateCount>{weeklyAnswers && weeklyAnswers.dateCnt}일</AnswerDateCount> 대답했어요.
      </HelperText>
      <DateIconsContainer>
        {moment.datesOfWeek.map((day) => (
          <DateCheckIcon checked={Object.keys(weeklyAnswers?.data ?? {}).includes(day)} />
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
