import moment, { Moment } from 'moment';
import { AnswerData, AnswersData } from './AnswerModels';
import { DateQidAnswersWrapper } from './DateQidAnswersWrapper';

// export interface AnswersWrapperValue {
//   getWeeklyAnswers: (moment: moment.Moment) => DateQidAnswersValue;
//   getMonthlyAnswers: (moment: moment.Moment) => DateQidAnswersValue;
// }

// get(...valueKeys) 로 원하는 데이터 여러개 받아올 수 있도록 구현
export class AnswersWrapper {
  private data: AnswersData;
  constructor(data: AnswersData) {
    this.data = data;
  }

  get(key: string) {
    // key list
    // 'weekly' 'daily' 'monthly' 'dateAndQid'
  }

  getWeeklyAnswers(date: Moment) {
    const filter = getFilter(this.data, date);
    return new DateQidAnswersWrapper(filter('year', 'week'));
  }
  getMonthlyAnswers(date: Moment) {
    const filter = getFilter(this.data, date);
    return new DateQidAnswersWrapper(filter('year', 'month'));
  }
}

class AnswerWrapper {
  data: AnswerData;

  constructor(data: AnswerData) {
    this.data = data;
  }
}

type MomentFilterKeys = 'year' | 'month' | 'week';
const getFilter =
  (answers: AnswersData, toFilterDate: Moment) =>
  (...filterKeys: MomentFilterKeys[]) => {
    const filtered: AnswersData = Object.keys(answers)
      .filter((aid) => {
        const {
          question: { publish_date },
        } = answers[aid];
        const answerMoment = moment(publish_date);
        return filterKeys.every((key) => toFilterDate[key]() === answerMoment[key]());
      })
      .reduce((obj, aid) => {
        return { ...obj, [aid]: answers[aid] };
      }, {});
    return filtered;
  };
