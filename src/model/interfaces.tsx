export interface AnswerType {
  aid: string;
  answer: string;
  created_at: string; // format - yyyy-mm-ddThh:mm:ss
  week: string;
  qid: string;
  uid: string;
  user: User;
  question: QuestionType;
  isAnonymous?: boolean;
  isPublic?: boolean;
  keepers?: {
    [uid: string]: boolean;
  };
}

export interface FetchedAnswers {
  [aid: string]: AnswerType;
}

export interface DateQidAnswers {
  [date: string]: {
    [qid: string]: {
      question: QuestionType;
      answers: {
        [aid: string]: AnswerType;
      };
    };
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

export interface QuestionType {
  qid: string;
  keyword: string;
  question: string;
  publish_date: string;
  week: string; // format - yyyy-mmWw
  answers?: {
    [aid: string]: boolean;
  };
}

export interface FetchedQuestions {
  [qid: string]: QuestionType;
}
