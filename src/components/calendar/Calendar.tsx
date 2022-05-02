import styled from 'styled-components';
import { DateType, formatDate } from '../../hooks/useDate';
import Cell from './Cell';
import { DateQidAnswersWrapper } from '../../models/DateQidAnswersWrapper';
import { useMoment } from '../../hooks';

interface Props {
  dates: string[];
  answers: DateQidAnswersWrapper;
}

const Calendar: React.FC<Props> = ({ dates, answers }) => {
  const { date } = useMoment();

  return (
    <CalendarContainer>
      <Day>월</Day>
      <Day>화</Day>
      <Day>수</Day>
      <Day>목</Day>
      <Day>금</Day>
      {dates.map((dateStr) => {
        const active = isActiveDate(dateStr, date);
        return <Cell key={dateStr} cnt={Object.keys(answers.get(dateStr)).length} active={active} date={dateStr} />;
      })}
    </CalendarContainer>
  );
};

const isActiveDate = (date: string, current: DateType) => {
  return date <= formatDate(current);
};

const CalendarContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 50px);
  gap: 17px;

  margin-top: 20px;
`;

const Day = styled.li`
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: #cccccc;
  height: inherit;
  background-color: transparent;

  text-align: center;
`;

export default Calendar;
