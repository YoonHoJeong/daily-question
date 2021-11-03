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
      console.log(value);

      if (value !== null) {
        const qSnapshot = await get(ref(fireDB, `/questions/${value.qid}`));
        const questionObj = qSnapshot.val();

        if (questionObj !== null) {
          value["question"] = questionObj.question;
          const aSnapshot = await get(ref(fireDB, `/answers/${value.qid}`));
          const answerObj = aSnapshot.val();
          const userSnapshot = await get(ref(fireDB, `/users/${value.uid}`));
          const userObj = userSnapshot.val();
        }
        setAnswers(value);
        setIsLoading(false);
      }
    });
  },
  getAllQuestions: (
    setQuestions: React.Dispatch<any>,
    isLoading: Boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    const questionsRef = ref(fireDB, "/questions");
    return onValue(questionsRef, async (snapshot) => {
      const questions = snapshot.val();
      console.log(questions);
      setIsLoading(false);
    });
  },
};
