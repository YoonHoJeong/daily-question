import React from 'react';
import styled from 'styled-components';
import DateToggler from '../../components/DateToggler';
import HelperText from '../../components/HelperText';
import { useFetchMyAnswers } from '../../hooks/customUseQueries';
import { datesOfMonth, useDate } from '../../hooks/useDate';
import Calendar from '../../components/calendar/Calendar';
import AnswersHeader from '../../components/answer/AnswersHeader';
import { LoadScreen } from '../../components/common';

interface Props {}

const MonthlyAnswersPage: React.FC<Props> = () => {
  const { data } = useFetchMyAnswers();
  const { date, setMonth } = useDate();

  if (!data) {
    return <LoadScreen />;
  }

  const answers = data.getMonthlyAnswers(date);

  return (
    <>
      <AnswersHeader>
        <DateToggler
          year={date.year()}
          month={date.month() + 1}
          onClickLeft={setMonth(date.month() - 1)}
          onClickRight={setMonth(date.month() + 1)}
        />
        <HelperText>
          <AnswerDateCount> {answers?.size || 0}개</AnswerDateCount>의 질문에 대답했어요.
        </HelperText>
      </AnswersHeader>

      <Calendar dates={datesOfMonth(date)} answers={answers} />
    </>
  );
};

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;

export default MonthlyAnswersPage;
