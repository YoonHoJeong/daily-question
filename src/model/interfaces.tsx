export interface Answer {
  aid: string;
  answer: string;
  created_at: string; // format - yyyy-mm-ddThh:mm:ss
  week: string;
  qid: string;
  uid: string;
  user: User;
  question: Question;
  isAnonymous?: boolean;
  isPublic?: boolean;
  keepers?: {
    [uid: string]: boolean;
  };
}

export interface User {
  uid: string;
  profile: {
    intro?: string;
    phone?: string;
    email?: string;
    name?: string;
  };
}

export interface FecthedUserAnswers {
  [uid: string]: {
    [aid: string]: Answer;
  };
}

export interface DateQidAnswers {
  [date: string]: {
    [qid: string]: {
      question: Question;
      answers: {
        [aid: string]: Answer;
      };
    };
  };
}

export interface Question {
  qid: string;
  keyword: string;
  question: string;
  publish_date: string;
  week: string; // format - yyyy-mmWw
  answers?: {
    [aid: string]: boolean;
  };
  rates?: Rate[];
}

export interface FetchedQuestions {
  [qid: string]: Question;
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
  question: Question;

  // interface Answer properties
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

export interface UserKeeps {
  [aid: string]: boolean;
}
