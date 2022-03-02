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
  week: string;
  isAnonymous?: boolean;
  isPublic?: boolean;
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

export interface AnswersWithQuestion {
  keyword: string;
  publish_date: string;
  qid: string;
  question: string;

  answers: {
    [aid: string]: Answer;
  };
}

export interface DateQuestionsAndAnswers {
  [date: string]: AnswersWithQuestions;
}
export interface AnswersWithQuestions {
  [qid: string]: AnswersWithQuestion;
}

export interface WeekDateAnswers {
  [week: string]: DateAnswers;
}

export interface DateAnswers {
  [date: string]: {
    [aid: string]: AnswerWithQuestion;
  };
}
export interface AnswerWithQuestion {
  aid: string;
  qid: string;
  answer: string;
  created_at: string;
  question: Question;
  week: string;
  isPublic?: boolean;
  isAnonymous?: boolean;
}

export interface UserKeeps {
  [aid: string]: boolean;
}
