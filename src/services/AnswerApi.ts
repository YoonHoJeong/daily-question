import { calcWeek, convertDate } from "./DateManager";
import {
  AnswerData,
  DateQidAnswers,
  FetchedAnswers,
  QuestionData,
} from "../model/interfaces";
import { getData, updateData } from "./DBInterface";
import { UserData } from "./UserApi";
import { queryClient } from "../App";

export interface AnswerFormData {
  question: QuestionData;
  aid?: string;
  answer: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export class Answer {
  private answer: AnswerData;
  constructor(answerData?: AnswerData) {
    if (answerData) {
      this.answer = answerData;
    }
  }

  async update(formData: object) {
    const { aid, uid } = this.answer;
    const data = Object.keys(formData).reduce(
      (data, key) => ({
        ...data,
        [`answers/${aid}/${key}`]: formData[key],
        [`user-answers/${uid}/${aid}/${key}`]: formData[key],
      }),
      {}
    );

    await updateData("", data);
    await Promise.all([
      queryClient.invalidateQueries("user-answers"),
      queryClient.invalidateQueries("board-answers"),
    ]);
  }

  public get aid() {
    return this.answer.aid;
  }
  public get qid() {
    return this.answer.qid;
  }
  public get isPublic() {
    return this.answer.isPublic;
  }
  public get isAnonymous() {
    return this.answer.isAnonymous;
  }
  public get question() {
    return this.answer.question.question;
  }
  public get keyword() {
    return this.answer.question.keyword;
  }
  public get answerText() {
    return this.answer.answer;
  }
}

export async function getUserAnswers(uid: string) {
  const userAnswers = getData<FetchedAnswers>(`user-answers/${uid}`);

  return userAnswers;
}

export async function getBoardAnswers() {
  const answers = await getData<FetchedAnswers>("answers", {
    key: "isPublic",
    value: true,
  });
  const dateQidAnswers = formatToDateQidAnswers(answers);

  return dateQidAnswers;
}

export function formatToDateQidAnswers(answers: FetchedAnswers) {
  const dateQidAnswers: DateQidAnswers = Object.keys(answers).reduce(
    (obj, aid) => {
      const answer = answers[aid];
      const {
        question: { publish_date: date, qid },
        question,
      } = answer;

      if (!obj[date]) {
        obj[date] = {};
      }
      if (!obj[date][qid]) {
        obj[date][qid] = {
          question,
          answers: {},
        };
      }

      obj[date][qid].answers[aid] = answer;

      return obj;
    },
    {}
  );
  return dateQidAnswers;
}

export function combineAnswerData(
  newAid: string,
  formData: AnswerFormData,
  userData: UserData
) {
  const answerData: AnswerData = {
    aid: newAid,
    answer: formData.answer,
    created_at: convertDate(new Date()),
    week: calcWeek(new Date(formData.question.publish_date)),
    qid: formData.question.qid,
    uid: userData.uid,
    user: userData,
    question: {
      ...formData.question,
      answers: {
        [newAid]: true,
      },
    },
    isAnonymous: formData.isAnonymous,
    isPublic: formData.isPublic,
  };
  return answerData;
}
