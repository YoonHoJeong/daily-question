import { AnswersData, DateQidAnswersData } from './AnswerModels';

export class DateQidAnswersWrapper {
  private _data: DateQidAnswersData;
  private _size: number;

  constructor(data: AnswersData) {
    const { data: convertedData, size } = covertToDateQidData(data);

    this._data = convertedData;
    this._size = size;
  }

  get(date: string) {
    // get answer by key(date)
    return this._data[date] ?? {};
  }
  map(callbackFn: (date: string) => JSX.Element, options?: { reverse: boolean }) {
    const dates = this.getDates({ reverse: !!options?.reverse });
    return dates.map(callbackFn);
  }

  hasDate(date: string) {
    return this.getDates().includes(date);
  }

  getDates(options?: { reverse: boolean }) {
    let dates: string[];
    if (options?.reverse) {
      dates = Object.keys(this._data).sort((a, b) => (a > b ? 1 : -1));
    } else {
      dates = Object.keys(this._data).sort((a, b) => (a > b ? -1 : 1));
    }
    return dates;
  }

  get dateCnt() {
    return getDateCnt(this._data);
  }
  get size() {
    return this._size;
  }
}

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
