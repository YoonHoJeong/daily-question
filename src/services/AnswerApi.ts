import { calcWeek, convertDate } from "./DateManager";

import { getData, updateData } from "./DBInterface";
import { queryClient } from "../App";
import {
  AnswerDataModel,
  AnswerFormData,
  DateQidAnswersDataModel,
  AnswersDataModel,
} from "../model/AnswerModels";
import { UserDataModel } from "../model/UserModels";
import { CustomDate } from "./CustomDate";

export class DateQidAnswers {
  private answers: DateQidAnswersDataModel;
  constructor(answers: DateQidAnswersDataModel) {
    this.answers = answers;
  }
  filteredByMonth(date: CustomDate) {
    const { answers } = this;
    const monthAnswers: DateQidAnswersDataModel = Object.keys(answers)
      .filter((tmpDate) => {
        const tmpDateObj = new CustomDate(new Date(tmpDate));
        return tmpDateObj.year === date.year && tmpDateObj.month === date.month;
      })
      .reduce((prev, tmpDate) => {
        return { ...prev, [tmpDate]: answers[tmpDate] };
      }, {});

    return new DateQidAnswers(monthAnswers);
  }
  filteredByWeek(date: CustomDate) {
    const { answers } = this;
    const weekAnswers: DateQidAnswersDataModel = Object.keys(answers)
      .filter((tmpDate) => {
        const tmpDateObj = new CustomDate(new Date(tmpDate));
        return tmpDateObj.weekString === date.weekString;
      })
      .reduce((prev, tmpDate) => {
        return { ...prev, [tmpDate]: answers[tmpDate] };
      }, {});

    return new DateQidAnswers(weekAnswers);
  }
  get answerCount() {
    const { answers } = this;
    const count = Object.keys(answers).reduce((weekAcc, date) => {
      const dateCnt = Object.keys(answers[date]).reduce(
        (dateAcc, qid) =>
          dateAcc + Object.keys(answers[date][qid].answers).length,
        0
      );
      return weekAcc + dateCnt;
    }, 0);
    return count;
  }
  get answeredDateCount() {
    return Object.keys(this.answers).length;
  }
  get data() {
    return this.answers;
  }
}

export class AnswersWrapper {
  private answers: AnswersDataModel;

  constructor(answers?: AnswersDataModel) {
    this.answers = answers ?? {};
  }
  getDatesDescending() {
    const dates = this.getDates();
    dates.sort((a, b) => (a > b ? -1 : 1));

    return dates;
  }

  getDates() {
    const { answers } = this;
    let dates = Object.keys(answers).map(
      (aid) => answers[aid].question.publish_date
    );
    dates = Array.from(new Set(dates));

    return dates;
  }

  getDateQidAnswers() {
    const { answers } = this;
    const dateQidAnswers: DateQidAnswersDataModel = Object.keys(answers).reduce(
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
    return new DateQidAnswers(dateQidAnswers);
  }
}

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
  const data = await getData<AnswersDataModel>("answers", {
    key: "isPublic",
    value: true,
  });
  const answers = new AnswersWrapper(data);

  return answers.getDateQidAnswers().data;
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
