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

export interface AnswersWithQuestion {
  keyword: string;
  publish_date: string;
  qid: string;
  question: string;

  answers: {
    [aid: string]: Answer;
  };
}

export interface DailyAnswersWithQuestions {
  [date: string]: AnswersWithQuestions;
}
export interface AnswersWithQuestions {
  [qid: string]: AnswersWithQuestion;
}

export interface UserAnswers {
  [week: string]: DayAnswers;
}

export interface DayAnswers {
  [date: string]: {
    [aid: string]: {
      aid: string;
      answer: string;
      created_at: string;
      question: Question;
    };
  };
}

export interface UserKeeps {
  [aid: string]: boolean;
}
