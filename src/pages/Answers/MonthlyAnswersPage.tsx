import React from 'react';
import { getAllDatesOfMonth, getToday } from '../../services/DateManager';
import styles from '../../assets/css/calendar.module.css';
import styled from 'styled-components';
import DateToggler from '../../components/DateToggler';
import HelperText from '../../components/HelperText';
import { AnswerData, DateQidAnswersData } from '../../models/AnswerModels';
import { QuestionDataModel } from '../../models/QuestionModels';
import { AnswersWrapper } from '../../services/AnswerApi';
import { CustomDate } from '../../services/CustomDate';
import { BottomNavigation, Header } from '../../components/layouts';
import { ClientLayout } from '../../components/layouts/ClientLayout';
import { useMyAnswers } from '../../hooks/customUseQueries';
import { useMoment } from '../../hooks/useMoment';

interface Props {
  // date: CustomDate;
  // answers: AnswersWrapper;
  // changeMonth: (monthCnt: number) => void;
}

const MonthlyAnswersPage: React.FC<Props> = () => {
  // const monthAnswers = answers.getDateQidAnswers().filteredByMonth(date);
  // const answerCount = monthAnswers.answerCount;
  const { data: answers } = useMyAnswers();
  const moment = useMoment();

  return (
    <>
      <DateToggler
        year={moment.year}
        month={moment.month + 1}
        onClickLeft={moment.setMonth(moment.month - 1)}
        onClickRight={moment.setMonth(moment.month + 1)}
      />
      {/* <HelperText>
        <AnswerDateCount> {answerCount}개</AnswerDateCount>의 질문에 대답했어요.
      </HelperText>

      <Calendar dateObj={date.obj} monthAnswers={monthAnswers.data} /> */}
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding-top: 24px;
  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerDateCount = styled.span`
  color: ${(props) => props.theme.palette.blue};
`;

interface CalendarProps {
  dateObj: Date;
  monthAnswers: DateQidAnswersData;
}

const Calendar: React.FC<CalendarProps> = ({ dateObj, monthAnswers }) => {
  const dates = getAllDatesOfMonth(dateObj);
  const todayDateObj = new Date(getToday());
  const isActiveDate = (compareDate: string) => (new Date(compareDate) < todayDateObj ? true : false);

  return (
    <ul className={styles.calendar}>
      <li className={styles.day}>월</li>
      <li className={styles.day}>화</li>
      <li className={styles.day}>수</li>
      <li className={styles.day}>목</li>
      <li className={styles.day}>금</li>
      {dates.map((date) => (
        <li key={date} className={isActiveDate(date) ? cellStyleByAnswerCnt(monthAnswers[date]) : styles.cellNonActive}>
          {new Date(date).getDate()}
        </li>
      ))}
    </ul>
  );
};

const cellStyleByAnswerCnt = (dateAnswers?: {
  [qid: string]: {
    question: QuestionDataModel;
    answers: {
      [aid: string]: AnswerData;
    };
  };
}) => {
  if (!dateAnswers) {
    return styles.cell0;
  }

  const answerCnt = Object.keys(dateAnswers).reduce(
    (acc, qid) => acc + Object.keys(dateAnswers[qid].answers).length,
    0
  );

  let cellStyle;
  if (answerCnt === 1) {
    cellStyle = styles.cell1;
  } else if (answerCnt === 2) {
    cellStyle = styles.cell2;
  } else if (answerCnt >= 3) {
    cellStyle = styles.cell3;
  }

  return cellStyle;
};

export default MonthlyAnswersPage;
