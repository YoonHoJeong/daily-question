import { MomentValue, useMoment } from '../hooks/useMoment';
import moment from 'moment';
import { AnswersData, DateQidAnswersData } from './AnswerModels';

export const AnswersWrapper = (data: AnswersData) => {
  const today = useMoment();
  const testDate = useMoment('2022-03-03');

  const filter = getFilter(data, testDate);

  return {
    getWeeklyAnswers() {
      const filtered = filter('year', 'week');
      return getDateQidAnswers(filtered);
    },
    getMonthlyAnswers() {
      const filtered = filter('year', 'month');
      return getDateQidAnswers(filtered);
    },
  };
};

type MomentFilterKeys = 'year' | 'month' | 'week';
const getFilter =
  (answers: AnswersData, toFilterDate: MomentValue) =>
  (...filterKeys: MomentFilterKeys[]) => {
    const filtered: AnswersData = Object.keys(answers)
      .filter((aid) => {
        const {
          question: { publish_date },
        } = answers[aid];
        const answerMoment = moment(publish_date);
        return filterKeys.every((key) => toFilterDate[key] === answerMoment[key]());
      })
      .reduce((obj, aid) => {
        return { ...obj, [aid]: answers[aid] };
      }, {});
    return filtered;
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
