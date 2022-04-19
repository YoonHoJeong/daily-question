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
