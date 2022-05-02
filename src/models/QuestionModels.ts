import { DateType } from '../hooks/useDate';

export interface QuestionDataModel {
  qid: string;
  keyword: string;
  question: string;
  publish_date: string;
  week: string; // format - yyyy-mmWw
  answers?: {
    [aid: string]: boolean;
  };
}

export interface QuestionsDataModel {
  [qid: string]: QuestionDataModel;
}

export class QuestionsWrapper {
  private data: QuestionsDataModel;

  constructor(data: QuestionsDataModel) {
    this.data = data ?? {};
  }

  filter(date: DateType) {
    const { data } = this;
    return Object.keys(data)
      .filter((qid) => data[qid].publish_date === date.format('YYYY-MM-DD'))
      .map((qid) => data[qid]);
  }

  get size() {
    const { data } = this;
    return Object.keys(data).length;
  }
}
