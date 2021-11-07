import { get, ref } from "@firebase/database";
import { fireDB } from "./firebase";

export const adminApi = {
  getAllUsers: async () => {
    const snapshot = await get(ref(fireDB, "/users"));
    const users = snapshot.val();
    const filtered = Object.keys(users)
      .filter(
        (uid) =>
          users[uid].uid !== "01031918941" && users[uid].answers !== undefined
      )
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
};
