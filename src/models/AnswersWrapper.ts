import { MomentValue, useMoment } from '../hooks/useMoment';
import moment from 'moment';
import { AnswersData, DateQidAnswersData } from './AnswerModels';

export const AnswersWrapper = (data: AnswersData) => {
  const today = useMoment();
  const march = useMoment('2022-03-03');

  return {
    getWeeklyAnswers() {
      const weeklyAnswers = getFilteredWith(data, march, 'year').filter('week');
      return getDateQidAnswers(weeklyAnswers.data);
    },
    getMonthlyAnswers() {
      const monthlyAnswers = getFilteredWith(data, march, 'year').filter('month');
      return getDateQidAnswers(monthlyAnswers.data);
    },
  };
};

const getFilteredWith = (answers: AnswersData, toFilterDate: MomentValue, dateKey: string) => {
  const filtered: AnswersData = Object.keys(answers)
    .filter((aid) => {
      const {
        question: { publish_date },
      } = answers[aid];
      const answerMoment = moment(publish_date);
      const answerDateValue = answerMoment[dateKey]();

      return toFilterDate[dateKey] === answerDateValue;
    })
    .reduce((obj, aid) => {
      return { ...obj, [aid]: answers[aid] };
    }, {});
  return {
    filter: (filterKey: string) => getFilteredWith(filtered, toFilterDate, filterKey),
    data: filtered,
  };
};

const getDateQidAnswers = (answers: AnswersData) => {
  const dateQidAnswers: DateQidAnswersData = Object.keys(answers).reduce((obj, aid) => {
    const answer = answers[aid];

    const {
      question: { publish_date: date, qid },
      question,
    } = answer;

    if (!obj[date]) {
      obj[date] = {};
    }
    if (!obj[date][qid]) {
      obj[date][qid] = {
        question,
        answers: {},
      };
    }

    obj[date][qid].answers[aid] = answer;

    return obj;
  }, {});
  return dateQidAnswers;
};
