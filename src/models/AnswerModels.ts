import { QuestionDataModel } from './QuestionModels';
import { UserDataModel } from './UserModels';

export interface AnswerData {
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

export interface AnswersData {
  [aid: string]: AnswerData;
}

export interface AnswerFormData {
  question: QuestionDataModel;
  aid?: string;
  answer: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export interface DateQidAnswersData {
  [date: string]: QidAnswersData;
}

export interface QidAnswersData {
  [qid: string]: QuestionAnswersModel;
}

export interface QuestionAnswersModel {
  question: QuestionDataModel;
  answers: {
    [aid: string]: AnswerData;
  };
}
