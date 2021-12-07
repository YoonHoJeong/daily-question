import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  update,
} from "@firebase/database";
import { UserFormState } from "../routes/admin/admin_enroll_user";
import { QuestionForm } from "../routes/admin/admin_enroll_question";
import { fireDB } from "./firebase";
import { Answer } from "../interfaces";
import dateService from "./dateService";

const excludeId = ["01031918941", "1135"];

const getAllUsers = async () => {
  const snapshot = await get(ref(fireDB, "/users"));
  const users = snapshot.val();
  const filtered = Object.keys(users)
    .filter((uid) => users[uid].uid !== "01031918941")
    .reduce((res, key) => ((res[key] = users[key]), res), {});

  return filtered;
};
const getAllRates = async () => {
  const snapshot = await get(ref(fireDB, "/rates"));
  const rates = snapshot.val();
  const filtered = Object.keys(rates)
    .filter((rid) => rates[rid].uid !== "01031918941")
    .reduce((res, key) => ((res[key] = rates[key]), res), {});

  return filtered;
};
const getAllQuestions = async () => {
  const snapshot = await get(ref(fireDB, "/questions"));
  const questions = snapshot.val();

  return questions;
};
const getTodayQuestions = async () => {
  const snapshot = await get(
    query(
      ref(fireDB, "questions"),
      orderByChild("publish_date"),
      equalTo(dateService.getToday())
    )
  );
  const questions = snapshot.val();

  return questions;
};
export const adminApi = {
  getAllUsers,
  getUsersExceptAnonymous: async () => {
    const snapshot = await get(ref(fireDB, "/users"));
    const users = snapshot.val();
    const filtered = Object.keys(users)
      .filter((uid) => !uid.includes("anonymous"))
      .reduce((res, key) => ((res[key] = users[key]), res), {});

    return filtered;
  },
  getAllAnswers: async function (): Promise<Answer[]> {
    // get data
    const answers = (await get(ref(fireDB, "/answers"))).val();
    const questions = (await get(ref(fireDB, "/questions"))).val();
    const rates = (await get(ref(fireDB, "/rates"))).val();

    // created_at / uid / category / question / answer / rate_degree / rate_comment
    return Object.keys(answers)
      .filter((aid) => !excludeId.includes(answers[aid].uid))
      .map((aid) => {
        const { uid, answer, qid, created_at } = answers[aid];

        const { keyword, question, publish_date } = questions[qid];
        const rate = Object.keys(rates)
          .filter((rid) => rates[rid].uid === uid && rates[rid].qid === qid)
          .map((rid) => rates[rid])
          .pop();

        const res = {
          aid,
          created_at,
          uid,
          question: {
            question,
            keyword,
            publish_date,
          },
          answer,
        };
        res["rate"] = rate;

        return res;
      });
  },
  getAllRates,
  getAllQuestions,
  getTodayQuestions,

  enrollNewUser: async ({
    uid,
    email = null,
    phone_number = null,
    sex = null,
    age = null,
  }: UserFormState) => {
    // 1. duplication check
    // 2. validation check
    // 3. enroll

    // const newUid = uid.replaceAll("/(. |#|$|[|])/g", "");
    const newUid = uid.replaceAll(".", "");

    // 1. duplication check
    const snapshot = await get(ref(fireDB, `users/${newUid}`));
    const userData = snapshot.val();

    const updates = {};
    updates[`users/${newUid}`] = { uid: newUid, email, phone_number, sex, age };

    if (userData !== null) {
      alert(`'${newUid}'는 이미 등록된 사용자입니다.`);
      return false;
    } else {
      // 중복 유저가 없을 때, 등록
      await update(ref(fireDB), updates);
      alert(`${newUid} 등록 성공`);
      return true;
    }
  },

  deleteUser: async (uid: string) => {
    // 실제로 삭제하진 않고, 익명으로 변경
    let snapshot = await get(ref(fireDB, `/users/${uid}`));
    const user = snapshot.val();
    let aids: any[] = [];
    let rids: any[] = [];
    if (user.answers) {
      aids = Object.keys(user.answers);
    }
    if (user.rates) {
      rids = Object.keys(user.rates);
    }

    const updates = {};

    const toDeleteUpdates = {};

    // answers, rates uid 변경
    aids?.forEach((aid) => {
      toDeleteUpdates[`/answers/${aid}`] = {};
    });
    rids?.forEach((rid) => {
      toDeleteUpdates[`/rates/${rid}`] = {};
    });

    // 기존 user 객체 삭제
    toDeleteUpdates[`/users/${uid}`] = {};

    try {
      await update(ref(fireDB), updates);
      await update(ref(fireDB), toDeleteUpdates);
    } catch (e) {
      console.log(e);
    }
  },

  deleteUserAnonymous: async (uid: string) => {
    // 실제로 삭제하진 않고, 익명으로 변경
    const newUid = `anonymous${push(ref(fireDB, "users")).key}`;
    let snapshot = await get(ref(fireDB, `/users/${uid}`));
    const user = snapshot.val();
    let aids: any[] = [];
    let rids: any[] = [];
    if (user.answers) {
      aids = Object.keys(user.answers);
    }
    if (user.rates) {
      rids = Object.keys(user.rates);
    }

    const anonymousUser = { ...user, uid: newUid };

    const updates = {};
    updates[`/users/${newUid}`] = anonymousUser;

    const toDeleteUpdates = {};

    // answers, rates uid 변경
    aids?.forEach((aid) => {
      toDeleteUpdates[`/answers/${aid}/uid`] = newUid;
    });
    rids?.forEach((rid) => {
      toDeleteUpdates[`/rates/${rid}/uid`] = newUid;
    });

    // 기존 user 객체 삭제
    toDeleteUpdates[`/users/${uid}`] = {};

    try {
      await update(ref(fireDB), updates);
      await update(ref(fireDB), toDeleteUpdates);
    } catch (e) {
      console.log(e);
    }
  },
  enrollQuestion: async ({
    qid,
    keyword,
    publish_date,
    question,
  }: QuestionForm) => {
    const updates = {};

    if (qid !== null) {
      updates[`/questions/${qid}`] = {
        qid,
        keyword,
        publish_date,
        question,
      };
    } else {
      const newQid = push(ref(fireDB, "questions")).key;

      updates[`/questions/${newQid}`] = {
        qid: newQid,
        keyword,
        publish_date,
        question,
        week: dateService.todayWeek(),
      };
    }
    await update(ref(fireDB), updates);
  },
  deleteQuestion: async (qid: string) => {
    const updates = {};

    updates[`questions/${qid}`] = {};

    try {
      await update(ref(fireDB), updates);
    } catch (e) {
      console.error(e);
    }
  },

  getQuestionById: async (qid: string) => {
    const question = (await get(ref(fireDB, `/questions/${qid}`))).val();
    return question;
  },
};
