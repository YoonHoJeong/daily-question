import React from 'react';
import styled from 'styled-components';
import DateToggler from '../../components/DateToggler';
import HelperText from '../../components/HelperText';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { datesOfMonth, useMoment } from '../../hooks/useMoment';
import { DateQidAnswersWrapper } from '../../models/DateQidAnswersWrapper';
import Calendar from '../../components/calendar/Calendar';
import AnswersHeader from '../../components/answer/AnswersHeader';

interface Props {}

const MonthlyAnswersPage: React.FC<Props> = () => {
  const { data } = useMyAnswers();
  const { date, setMonth } = useMoment();
  const answers = data?.getMonthlyAnswers(date) ?? DateQidAnswersWrapper({});

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

      <Calendar dates={datesOfMonth(date)} current={date} answers={answers} />
    </>
  );
};

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;

export default MonthlyAnswersPage;
