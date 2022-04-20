import styled from 'styled-components';
import moment from 'moment';
import { DateQidAnswersValue } from '../../models/DateQidAnswersWrapper';
import { formatDate } from '../../hooks/useMoment';
import Cell from './Cell';

interface Props {
  dates: string[];
  current: moment.Moment;
  answers: DateQidAnswersValue;
}

const Calendar: React.FC<Props> = ({ dates, current, answers }) => {
  return (
    <CalendarContainer>
      <Day>월</Day>
      <Day>화</Day>
      <Day>수</Day>
      <Day>목</Day>
      <Day>금</Day>
      {dates.map((date) => {
        const active = isActiveDate(date, current);
        return <Cell key={date} cnt={Object.keys(answers.data[date] ?? {}).length} active={active} date={date} />;
      })}
    </CalendarContainer>
  );
};

const isActiveDate = (date: string, current: moment.Moment) => {
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
