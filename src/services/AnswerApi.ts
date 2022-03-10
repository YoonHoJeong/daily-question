import { calcWeek, convertDate } from "./DateManager";

import { getData, updateData } from "./DBInterface";
import { queryClient } from "../App";
import {
  AnswerDataModel,
  AnswerFormData,
  DateQidAnswers,
  AnswersDataModel,
} from "../model/AnswerModels";
import { UserDataModel } from "../model/UserModels";

export class Answer {
  private answer: AnswerDataModel;
  constructor(answerData?: AnswerDataModel) {
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
  const userAnswers = getData<AnswersDataModel>(`user-answers/${uid}`);

  return userAnswers;
}

export async function getBoardAnswers() {
  const answers = await getData<AnswersDataModel>("answers", {
    key: "isPublic",
    value: true,
  });
  const dateQidAnswers = formatToDateQidAnswers(answers);

  return dateQidAnswers;
}

export function formatToDateQidAnswers(answers: AnswersDataModel) {
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
  userData: UserDataModel
) {
  const answerData: AnswerDataModel = {
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
