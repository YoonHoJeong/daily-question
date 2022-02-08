export interface Question {
  qid: string;
  keyword: string;
  question: string;
  publish_date: string;
  week: string; // format - yyyy-mmWw
  answers?: Answer[];
  rates?: Rate[];
}

export interface FetchedQuestions {
  [qid: string]: Question;
}

export interface Answer {
  aid: string;
  answer: string;
  created_at: string; // format - yyyy-mm-ddThh:mm:ss
  qid: string;
  uid: string;
  keepers?: {
    [uid: string]: boolean;
  };
}
export interface FetchedAnswers {
  [aid: string]: Answer;
}

export interface Rate {
  comment?: string;
  degree?: number;
  created_at: string;
  qid: string;
  rid: string;
  uid: string;
}
