export interface Question {
  qid: string;
  keyword: string;
  question: string;
  publish_date: string;
  week?: string;
  answers?: any[];
  rates?: any[];
}
