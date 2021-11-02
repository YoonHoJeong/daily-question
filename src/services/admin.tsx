import { get, onValue, ref } from "@firebase/database";
import { fireDB } from "./firebase";

export const adminApi = {
  getAllAnswers: (
    setAnswers: React.Dispatch<any>,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    const answersRef = ref(fireDB, "/answers");

    return onValue(answersRef, async (snapshot) => {
      setIsLoading(true);
      let value = snapshot.val();

      if (value !== null) {
        const qsnapshot = await get(ref(fireDB, `/questions/${value.qid}`));
        const questionObj = qsnapshot.val();
        const userSnapshot = await get(ref(fireDB, `/users/${value.uid}`));
        const userObj = userSnapshot.val();
        if (questionObj !== null) {
          value["question"] = questionObj.question;
        }
        setAnswers(value);
        setIsLoading(false);
      }
    });
  },
};
