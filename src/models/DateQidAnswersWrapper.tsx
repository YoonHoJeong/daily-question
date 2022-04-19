import { AnswersData, DateQidAnswersData } from './AnswerModels';

export interface DateQidAnswersValue {
  data: DateQidAnswersData;
  size: number;
  dateCnt: number;
}

export const DateQidAnswersWrapper = (answers: AnswersData) => {
  const { data, size } = covertToDateQidData(answers);
  const value: DateQidAnswersValue = { data, dateCnt: getDateCnt(data), size };
  return value;
};

const getDateCnt = (data: DateQidAnswersData) => {
  return Object.keys(data).length;
};

const covertToDateQidData = (answers: AnswersData) => {
  let size = 0;
  const dateQidAnswers: DateQidAnswersData = Object.keys(answers).reduce((obj, aid) => {
    const answer = answers[aid];
    const {
      question: { publish_date: date, qid },
      question,
    } = answer;
    size++;

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

    return { ...obj };
  }, {});
  return { data: dateQidAnswers, size };
};
