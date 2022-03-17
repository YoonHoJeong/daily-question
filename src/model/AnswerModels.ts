import { QuestionDataModel } from "./QuestionModels";
import { UserDataModel } from "./UserModels";

export interface AnswerDataModel {
  aid: string;
  answer: string;
  created_at: string; // format - yyyy-mm-ddThh:mm:ss
  week: string;
  qid: string;
  uid: string;
  user: UserDataModel;
  question: QuestionDataModel;
  isAnonymous?: boolean;
  isPublic?: boolean;
  keepers?: {
    [uid: string]: boolean;
  };
}

export interface AnswersDataModel {
  [aid: string]: AnswerDataModel;
}

export interface AnswerFormData {
  question: QuestionDataModel;
  aid?: string;
  answer: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export interface DateQidAnswersDataModel {
  [date: string]: {
    [qid: string]: {
      question: QuestionDataModel;
      answers: {
        [aid: string]: AnswerDataModel;
      };
    };
  };
}
