export interface AnswerData {
  aid: string;
  answer: string;
  created_at: string; // format - yyyy-mm-ddThh:mm:ss
  week: string;
  qid: string;
  uid: string;
  user: User;
  question: QuestionData;
  isAnonymous?: boolean;
  isPublic?: boolean;
  keepers?: {
    [uid: string]: boolean;
  };
}

export interface FetchedAnswers {
  [aid: string]: AnswerData;
}

export interface DateQidAnswers {
  [date: string]: {
    [qid: string]: {
      question: QuestionData;
      answers: {
        [aid: string]: AnswerData;
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

export interface QuestionData {
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
  [qid: string]: QuestionData;
}
