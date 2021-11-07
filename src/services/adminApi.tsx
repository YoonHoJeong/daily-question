import { get, push, ref, update } from "@firebase/database";
import { UserFormState } from "../routes/admin_enroll";
import { QuestionForm } from "../routes/admin_enroll_question";
import { fireDB } from "./firebase";

export const adminApi = {
  getAllUsers: async () => {
    const snapshot = await get(ref(fireDB, "/users"));
    const users = snapshot.val();
    const filtered = Object.keys(users)
      .filter((uid) => users[uid].uid !== "01031918941")
      .reduce((res, key) => ((res[key] = users[key]), res), {});

    return filtered;
  },
  getUsersExceptAnonymous: async () => {
    const snapshot = await get(ref(fireDB, "/users"));
    const users = snapshot.val();
    const filtered = Object.keys(users)
      .filter((uid) => uid !== "01031918941" && !uid.includes("anonymous"))
      .reduce((res, key) => ((res[key] = users[key]), res), {});

    return filtered;
  },
  getAllAnswers: async () => {
    const snapshot = await get(ref(fireDB, "/answers"));
    const answers = snapshot.val();

    const filtered = Object.keys(answers)
      .filter((aid) => answers[aid].uid !== "01031918941")
      .reduce((res, key) => ((res[key] = answers[key]), res), {});

    return filtered;
  },
  getAllRates: async () => {
    const snapshot = await get(ref(fireDB, "/rates"));
    const rates = snapshot.val();
    const filtered = Object.keys(rates)
      .filter((rid) => rates[rid].uid !== "01031918941")
      .reduce((res, key) => ((res[key] = rates[key]), res), {});

    return filtered;
  },
  getAllQuestions: async () => {
    const snapshot = await get(ref(fireDB, "/questions"));
    const questions = snapshot.val();

    return questions;
  },

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
  enrollQuestion: async ({ keyword, publish_date, question }: QuestionForm) => {
    const newQid = push(ref(fireDB, "questions")).key;
    const updates = {};

    updates[`/questions/${newQid}`] = {
      qid: newQid,
      keyword,
      publish_date,
      question,
    };

    await update(ref(fireDB), updates);
  },
};
