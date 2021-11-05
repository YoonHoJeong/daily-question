import {
  endBefore,
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
} from "@firebase/database";
import { fireDB } from "./firebase";
import { formatDateUntilDay } from "./question";

export const adminApi = {
  getAllUsers: async () => {
    const snapshot = await get(ref(fireDB, "/users"));
    const users = snapshot.val();
    const filtered = Object.keys(users)
      .filter((rid) => users[rid].uid !== "01031918941")
      .map((rid) => users[rid]);

    return filtered;
  },
  getAllAnswers: async () => {
    const snapshot = await get(ref(fireDB, "/answers"));
    const answers = snapshot.val();
    const filtered = Object.keys(answers)
      .filter((rid) => answers[rid].uid !== "01031918941")
      .map((rid) => answers[rid]);

    return filtered;
  },
  getAllRates: async () => {
    const snapshot = await get(ref(fireDB, "/rates"));
    const rates = snapshot.val();
    const filtered = Object.keys(rates)
      .filter((rid) => rates[rid].uid !== "01031918941")
      .map((rid) => rates[rid]);

    return filtered;
  },
  getAllQuestions: async () => {
    const snapshot = await get(ref(fireDB, "/questions"));
    const questions = snapshot.val();
    const filtered = Object.keys(questions)
      .filter((rid) => questions[rid].uid !== "01031918941")
      .map((rid) => questions[rid]);

    return filtered;
  },
};
